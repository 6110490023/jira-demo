package usecase

import (
	"context"
	"jira-demo/internal/infrastructure/domain"
	jiraDemoModel "jira-demo/internal/infrastructure/sql/model"
	"jira-demo/internal/repository"
	"jira-demo/logs"

	"github.com/google/uuid"
)

type UserUsecase interface {
	Login(ctx context.Context, user domain.UserLoginRequest) (string, error)
	Register(ctx context.Context, user domain.RegisTerUser) (domain.User, error)
}
type userUseCase struct {
	jwt      string
	userRepo repository.UserRepoInterface
	logger   logs.Logger //Logger of service
}

func NewUserUseCase(repo repository.UserRepoInterface, jwt string, logger logs.Logger) userUseCase {
	uc := userUseCase{
		jwt:      jwt,
		userRepo: repo,
		logger:   logger,
	}
	return uc
}

func (uuc *userUseCase) Login(ctx context.Context, user domain.UserLoginRequest) (string, error) {
	userRepo, err := uuc.userRepo.GetUserByUserName(ctx, user.UserName)
	if err != nil {
		return "", err
	}
	if userRepo.Username == "" {
		return "ไม่พบข้อมูล", nil
	}
	if !domain.CheckPasswordHash(user.Password, userRepo.PasswordHash) {
		return "รหัสผ่านไม่ถูกต้อง", nil
	}
	dataGentoken := domain.User{
		ID:       userRepo.ID,
		Username: userRepo.Username,
	}
	token, err := domain.GenerateJWT(dataGentoken, uuc.jwt)
	if err != nil {
		return "", err
	}
	return token, nil
}
func (uuc *userUseCase) Register(ctx context.Context, user domain.RegisTerUser) (domain.User, error) {
	hashPassword, err := domain.HashPassword(user.Password)
	if err != nil {
		return domain.User{}, err
	}
	userRepo := jiraDemoModel.User{
		ID:           uuid.Nil,
		Username:     user.Username,
		PasswordHash: hashPassword,
		Email:        user.Email,
		RoleName:     user.RoleName,
	}
	userID, err := uuc.userRepo.InsertUser(ctx, userRepo)
	if err != nil {
		return domain.User{}, err
	}
	userData := domain.User{
		ID:       userID,
		Username: user.Username,
		Email:    user.Email,
		RoleName: user.RoleName,
	}
	return userData, nil
}
