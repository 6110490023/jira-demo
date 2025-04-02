package jiraDemoModel

import (
	"github.com/google/uuid"
)

type User struct {
	ID           uuid.UUID `db:"id"`
	Username     string    `db:"username"`
	PasswordHash string    `db:"passwordHash"`
	Email        string    `db:"email"`
	RoleName     string    `db:"roleName"`
}

type UserLoginRequest struct {
	UserName string `json:"username"`
	Password string `json:"password"`
}
