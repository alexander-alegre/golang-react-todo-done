package models

import (
	"database/sql"
	"time"
)

type Todo struct {
	ID        int          `json:"id"`
	Task      string       `json:"task"`
	Deleted   bool         `json:"deleted"`
	CreatedAt time.Time    `json:"created_at"`
	UpdatedAt time.Time    `json:"updated_at"`
	DeletedAt sql.NullTime `json:"deleted_at"`
}
