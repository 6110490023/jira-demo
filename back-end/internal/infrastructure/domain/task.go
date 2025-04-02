package domain

import (
	"github.com/google/uuid"
)

//	type AdjustStock struct {
//		ItemID      string `json:"itemID"`
//		Quantity    int    `json:"Qty"`
//		WarehouseID string `json:"warehouseID"`
//		ProductID   string `json:"productID,omitempty"`
//	}
type ResponeGetTask struct {
	ID        uuid.UUID `json:"id,omitempty"`
	Title     string    `json:"title,omitempty"`
	Priority  string    `json:"priority,omitempty"`
	Status    string    `json:"status,omitempty"`
	StartDate string    `json:"startDate,omitempty"`
	EndDate   string    `json:"endDate,omitempty"`
	CreateBy  uuid.UUID `json:"createBy,omitempty"`
}
