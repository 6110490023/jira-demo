package main

import (
	"encoding/json"
	"jira-demo/internal/infrastructure/domain"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func (app *Application) TaskRoute(apiRouter *chi.Mux) {

	apiRouter.Route("/task", func(r chi.Router) {
		r.Use(app.JWTMiddleware)
		r.Get("/get-all", app.GetAllTasks)
		r.Post("/create", app.CreateTask)
		r.Patch("/update-by-id", app.UpdateTask)
		r.Patch("/delete-by-id", app.DeleteTask)
	})

}

// @Summary Get all products
// @Description Get All Task
// @Tags Task
// @Security BearerAuth
// @Accept  json
// @Produce  json
// @Success 200 {object} Response{result=[]domain.ResponeGetTask} "task list"
// @Failure 500 {object} Response "Internal Server Error"
// @Router /task/get-all [get]
func (app *Application) GetAllTasks(w http.ResponseWriter, r *http.Request) {

	result, err := app.HandlerUseCase.Task.GetAllTask(r.Context())
	if err != nil {
		handleError(w, err)
	}

	handleResponse(w, true, "ดึงข้อมูลสำเร็จ", result, http.StatusOK)
}

// @Summary Get all products
// @Description Create Task
// @Tags Task
// @Accept  json
// @Produce  json
// @Security BearerAuth
// @Param responeGetTask body domain.ResponeGetTask true "create task"
// @Success 200 {object} Response{result=uuid.UUID} "task id"
// @Failure 500 {object} Response "Internal Server Error"
// @Router /task/create [post]
func (app *Application) CreateTask(w http.ResponseWriter, r *http.Request) {
	req := domain.ResponeGetTask{}
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		handleError(w, err)
		return
	}
	taskID, err := app.HandlerUseCase.Task.CreateTask(r.Context(), req)
	if err != nil {
		handleError(w, err)
		return
	}

	handleResponse(w, true, "ดึงข้อมูลสำเร็จ", taskID, http.StatusOK)
}

// @Summary Get all products
// @Description Update Task
// @Tags Task
// @Accept  json
// @Produce  json
// @Security BearerAuth
// @Param responeGetTask body domain.ResponeGetTask true "update task"
// @Success 200 {object} Response{result=string} "result data"
// @Failure 500 {object} Response "Internal Server Error"
// @Router /task/update-by-id [patch]
func (app *Application) UpdateTask(w http.ResponseWriter, r *http.Request) {
	req := domain.ResponeGetTask{}
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		handleError(w, err)
		return
	}
	result, err := app.HandlerUseCase.Task.UpdateTask(r.Context(), req)
	if err != nil {
		handleError(w, err)
		return
	}

	handleResponse(w, true, "อัพเดท ข้อมูลสำเร็จ", result, http.StatusOK)
}

// @Summary Get all products
// @Description Delete Task
// @Tags Task
// @Accept  json
// @Produce  json
// @Security BearerAuth
// @Param responeGetTask body domain.ResponeGetTask true "delete task"
// @Success 200 {object} Response{result=string} "result data"
// @Failure 500 {object} Response "Internal Server Error"
// @Router /task/delete-by-id [patch]
func (app *Application) DeleteTask(w http.ResponseWriter, r *http.Request) {
	req := domain.ResponeGetTask{}
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		handleError(w, err)
		return
	}
	result, err := app.HandlerUseCase.Task.DeleteTask(r.Context(), req.ID)
	if err != nil {
		handleError(w, err)
		return
	}

	handleResponse(w, true, "ลบข้อมูล สำเร็จ", result, http.StatusOK)
}
