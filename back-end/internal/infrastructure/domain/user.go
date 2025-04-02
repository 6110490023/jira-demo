package domain

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID       uuid.UUID `json:"id"`
	Username string    `json:"username"`
	Email    string    `json:"email"`
	RoleName string    `json:"roleName"`
}

type RegisTerUser struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	RoleName string `json:"roleName"`
	Password string `json:"Password"`
}
type UserLoginRequest struct {
	UserName string `json:"username"`
	Password string `json:"password"`
}

type Claims struct {
	ID       uuid.UUID `json:"id"`
	Username string    `json:"username"`
	Email    string    `json:"email"`
	RoleName string    `json:"roleName"`
	jwt.RegisteredClaims
}

// HashPassword generates a bcrypt hash of the password
func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

// CheckPasswordHash compares a hashed password with a plain text password
func CheckPasswordHash(password, hash string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)) == nil
}

func GenerateJWT(user User, jwtKey string) (string, error) {
	jwtKeyByte := []byte(jwtKey)
	expirationTime := time.Now().Add(time.Hour * 24 * 7) //7 day
	claims := &Claims{
		ID:       user.ID,
		Username: user.Username,
		Email:    user.Email,
		RoleName: user.RoleName,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKeyByte)
}
