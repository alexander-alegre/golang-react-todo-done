package models

import (
	"database/sql"
	"time"
)

type Todo struct {
	ID        int          `bun:"id,pk,autoincrement"`
	Task      string       `json:"task"`
	Deleted   bool         `json:"deleted"`
	CreatedAt time.Time    `json:"created_at" bun:"default:now()"`
	UpdatedAt time.Time    `json:"updated_at"`
	DeletedAt sql.NullTime `json:"deleted_at"`
}
