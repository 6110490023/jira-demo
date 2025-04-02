package repository

import (
	"context"
	"fmt"
	jiraDemoModel "jira-demo/internal/infrastructure/sql/model"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type taskRepo struct {
	db *sqlx.DB
}

func NewTaskRepo(db *sqlx.DB) taskRepo {
	return taskRepo{db: db}
}

type TaskRepoInterface interface {
	GetAllTask(ctx context.Context) ([]jiraDemoModel.Task, error)
	UpdateTask(ctx context.Context, task jiraDemoModel.Task) error
	DeleteTask(ctx context.Context, TaskID uuid.UUID) error
	InsertTask(ctx context.Context, task jiraDemoModel.Task) (uuid.UUID, error)
}

func (r *taskRepo) GetAllTask(ctx context.Context) ([]jiraDemoModel.Task, error) {
	var tasks []jiraDemoModel.Task
	query := `
		SELECT 
			id, 
			title, 
			priority, 
			status, 
			"startDate", 
			"endDate", 
			"createBy"
		FROM public.tasks
		WHERE "deleteAt" is null;
	`
	// ใช้ QueryContext เพื่อรองรับ context
	err := r.db.SelectContext(ctx, &tasks, query)
	if err != nil {
		return nil, err
	}

	return tasks, nil
}

func (r *taskRepo) UpdateTask(ctx context.Context, task jiraDemoModel.Task) error {
	query := `
	UPDATE public.tasks SET 
		title = :title,
		priority = :priority,
		status = :status,
		"startDate" = :startDate,
		"endDate" = :endDate
	WHERE id = :id and "deleteAt" is null
	`

	// Execute the query
	result, err := r.db.NamedExecContext(ctx, query, task)
	if err != nil {
		return err
	}

	// Check if any row was actually updated
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return fmt.Errorf("no task found with id: %d", task.ID)
	}

	return nil
}
func (r *taskRepo) DeleteTask(ctx context.Context, taskID uuid.UUID) error {
	query := `
	UPDATE public.tasks SET 
		"deleteAt" = NOW() 
	WHERE id = :taskID  and "deleteAt" is null
	`
	// Execute the query
	result, err := r.db.NamedExecContext(ctx, query, map[string]interface{}{"taskID": taskID})
	if err != nil {
		return err
	}
	// Check if any row was actually updated
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rowsAffected == 0 {
		return fmt.Errorf("no task found with id: %s", taskID)
	}
	return nil
}
func (r *taskRepo) InsertTask(ctx context.Context, task jiraDemoModel.Task) (uuid.UUID, error) {
	query := `
	INSERT INTO public.tasks (
		title, priority, status, "startDate", "endDate", "createBy", "createdAt"
	) VALUES (
		:title, :priority, :status, :startDate, :endDate, :createBy, NOW()
	) RETURNING id;
	`

	// Variable to store the returned task ID
	var taskID uuid.UUID
	fmt.Println("CreateBy:", task.CreateBy)
	// Execute the query with named parameters
	rows, err := r.db.NamedQueryContext(ctx, query, task)
	if err != nil {
		return uuid.Nil, err
	}
	defer rows.Close()

	// Fetch the returned ID
	if rows.Next() {
		err = rows.Scan(&taskID)
		if err != nil {
			return uuid.Nil, err
		}
	}

	return taskID, nil
}
