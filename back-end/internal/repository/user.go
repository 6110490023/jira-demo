package repository

import (
	"context"
	"database/sql"
	jiraDemoModel "jira-demo/internal/infrastructure/sql/model"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type userRepo struct {
	db *sqlx.DB
}

func NewUserRepo(db *sqlx.DB) userRepo {
	return userRepo{db: db}
}

func (repo *userRepo) GetUserAll() string {
	return "test"

}

type UserRepoInterface interface {
	GetAllUser(ctx context.Context) ([]jiraDemoModel.User, error)
	InsertUser(ctx context.Context, user jiraDemoModel.User) (uuid.UUID, error)
	GetUserByUserName(ctx context.Context, username string) (jiraDemoModel.User, error)
}

func (r *userRepo) GetAllUser(ctx context.Context) ([]jiraDemoModel.User, error) {
	var user []jiraDemoModel.User
	//TODO : เปลี่ยน query
	query := `
	SELECT 
		id,
		title,
		priority,
		status,
		"startDate",
		"endDate",
		"createBy",
		"createdAt" 
	FROM public.users
	WHERE "deleteAt" is not null
	`
	// ใช้ QueryContext เพื่อรองรับ context
	err := r.db.SelectContext(ctx, &user, query)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (r *userRepo) GetUserByUserName(ctx context.Context, userName string) (jiraDemoModel.User, error) {
	var user jiraDemoModel.User
	query := `
	SELECT 
		id,
		username,
		email,
		"roleName",
		"passwordHash"
	FROM public.users
	WHERE username = :userName AND "deleteAt" IS NULL
	`
	// ใช้ NamedQueryContext เพื่อให้รองรับ Named Parameter
	rows, err := r.db.NamedQueryContext(ctx, query, map[string]interface{}{
		"userName": userName,
	})
	if err != nil {
		return user, err
	}
	defer rows.Close()

	if rows.Next() {
		err = rows.StructScan(&user)
		if err != nil {
			return user, err
		}
		return user, nil
	}

	return user, sql.ErrNoRows
}
func (r *userRepo) InsertUser(ctx context.Context, user jiraDemoModel.User) (uuid.UUID, error) {
	query := `
	INSERT INTO public.users (
		username, email, "roleName", "passwordHash", "createdAt"
	) VALUES (
	 	:username,:email,:roleName,:passwordHash,NOW() 
	) RETURNING id;
	`
	var userID uuid.UUID
	rows, err := r.db.NamedQueryContext(ctx, query, user)
	if err != nil {
		return uuid.Nil, err
	}
	defer rows.Close()
	if rows.Next() {
		err = rows.Scan(&userID)
		if err != nil {
			return uuid.Nil, err
		}
		return userID, nil
	}
	return uuid.Nil, nil
}
