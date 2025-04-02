package jiraDemoModel

import (
	"github.com/google/uuid"
)

type Task struct {
	ID        uuid.UUID `db:"id"`
	Title     string    `db:"title"`
	Priority  string    `db:"priority"`
	Status    string    `db:"status"`
	StartDate string    `db:"startDate"`
	EndDate   string    `db:"endDate"`
	CreateBy  uuid.UUID `db:"createBy"`
}
