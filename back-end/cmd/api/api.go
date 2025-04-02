package main

import (
	"jira-demo/config"
	"jira-demo/internal/usecase"
	"jira-demo/logs"

	"github.com/go-chi/jwtauth"
)

type HandlerUseCase struct {
	Task usecase.TaskUsecase
	User usecase.UserUsecase
}

type Application struct {
	Config         *config.AppConfig
	Logger         logs.Logger
	TokenAuth      *jwtauth.JWTAuth
	HandlerUseCase HandlerUseCase
}
