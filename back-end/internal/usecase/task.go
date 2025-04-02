package usecase

import (
	"context"
	"jira-demo/internal/infrastructure/domain"
	jiraDemoModel "jira-demo/internal/infrastructure/sql/model"
	"jira-demo/internal/repository"
	"jira-demo/logs"

	"github.com/google/uuid"
	"go.uber.org/zap"
)

type taskUseCase struct {
	taskRepo repository.TaskRepoInterface
	logger   logs.Logger //Logger of service
}

func NewTaskUseCase(repo repository.TaskRepoInterface, logger logs.Logger) taskUseCase {
	srv := taskUseCase{
		taskRepo: repo,
		logger:   logger,
	}
	return srv
}

type TaskUsecase interface {
	GetAllTask(ctx context.Context) ([]domain.ResponeGetTask, error)
	UpdateTask(ctx context.Context, task domain.ResponeGetTask) (string, error)
	DeleteTask(ctx context.Context, taskID uuid.UUID) (string, error)
	CreateTask(ctx context.Context, task domain.ResponeGetTask) (uuid.UUID, error)
}

func (tuc *taskUseCase) GetAllTask(ctx context.Context) ([]domain.ResponeGetTask, error) {
	tuc.logger.Info("service GetAllTask")
	repoData, err := tuc.taskRepo.GetAllTask(ctx)
	if err != nil {
		tuc.logger.Error("GetAllTask", zap.Error(err))
	}
	tasks := []domain.ResponeGetTask{}
	for _, task := range repoData {
		tasks = append(tasks, domain.ResponeGetTask{
			ID:        task.ID,
			Title:     task.Title,
			Priority:  task.Priority,
			Status:    task.Status,
			StartDate: task.StartDate,
			EndDate:   task.EndDate,
			CreateBy:  task.CreateBy,
		})
	}

	return tasks, nil

}

func (tuc *taskUseCase) UpdateTask(ctx context.Context, task domain.ResponeGetTask) (string, error) {
	tuc.logger.Info("service UpdateTask")
	updateTask := jiraDemoModel.Task{
		ID:        task.ID,
		Title:     task.Title,
		Priority:  task.Priority,
		Status:    task.Status,
		StartDate: task.StartDate,
		EndDate:   task.EndDate,
	}
	err := tuc.taskRepo.UpdateTask(ctx, updateTask)
	if err != nil {
		tuc.logger.Error("UpdateTask", zap.Error(err))
		return "update fail", err
	}
	return "update successful ", nil

}

func (tuc *taskUseCase) DeleteTask(ctx context.Context, taskID uuid.UUID) (string, error) {
	tuc.logger.Info("service DeleteTask")

	err := tuc.taskRepo.DeleteTask(ctx, taskID)
	if err != nil {
		tuc.logger.Error("UpdateTask", zap.Error(err))
		return "delete fail", err
	}
	return "delete successful ", nil

}

func (tuc *taskUseCase) CreateTask(ctx context.Context, task domain.ResponeGetTask) (uuid.UUID, error) {
	tuc.logger.Info("service CreateTask")
	updateTask := jiraDemoModel.Task{
		Title:     task.Title,
		Priority:  task.Priority,
		Status:    task.Status,
		StartDate: task.StartDate,
		CreateBy:  task.CreateBy,
		EndDate:   task.EndDate,
	}
	taskID, err := tuc.taskRepo.InsertTask(ctx, updateTask)
	if err != nil {
		tuc.logger.Error("CreateTask", zap.Error(err))
		return uuid.Nil, err
	}
	return taskID, nil
}
