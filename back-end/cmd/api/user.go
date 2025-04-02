package main

import (
	"encoding/json"
	"jira-demo/internal/infrastructure/domain"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func (app *Application) UserRoute(apiRouter *chi.Mux) {
	apiRouter.Route("/user", func(r chi.Router) {
		r.Post("/login", app.Login)
		r.Post("/register", app.Register)
	})
}

// @Summary Get all products
// @Description Get All Task
// @Tags User
// @Accept  json
// @Produce  json
// @Param userLogin body domain.UserLoginRequest true "login data"
// @Success 200 {object} Response{result=string} "token jwt"
// @Failure 500 {object} Response "Internal Server Error"
// @Router /user/login [post]
func (app *Application) Login(w http.ResponseWriter, r *http.Request) {
	req := domain.UserLoginRequest{}
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		handleError(w, err)
		return
	}
	result, err := app.HandlerUseCase.User.Login(r.Context(), req)
	if err != nil {
		handleError(w, err)
		return
	}

	handleResponse(w, true, "เข้าสู่ระบบสำเร็จ", result, http.StatusOK)
}

// @Summary Get all products
// @Description Update Task
// @Tags User
// @Accept  json
// @Produce  json
// @Param register body domain.RegisTerUser true "register user"
// @Success 200 {object} Response{result=domain.User} "result data"
// @Failure 500 {object} Response "Internal Server Error"
// @Router /user/register [post]
func (app *Application) Register(w http.ResponseWriter, r *http.Request) {
	req := domain.RegisTerUser{}
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		handleError(w, err)
		return
	}
	userID, err := app.HandlerUseCase.User.Register(r.Context(), req)
	if err != nil {
		handleError(w, err)
		return
	}
	handleResponse(w, true, "บันทึกข้อมูล ข้อมูลสำเร็จ", userID, http.StatusOK)
}
