package services

import (
	"context"
	"main/internal/models"
	"main/internal/pkg/db"
)

func GetTodos() ([]models.Todo, error) {
	var todos []models.Todo
	err := db.Bun.NewSelect().
		Model(&todos).
		Where("deleted = ?", false).
		Scan(context.Background())

	return todos, err
}

func CreateTodo(todo *models.Todo) error {
	_, err := db.Bun.NewInsert().
		Model(todo).
		Exec(context.Background())

	return err
}

func UpdateTodo(todo *models.Todo) error {
	_, err := db.Bun.NewUpdate().
		Model(todo).
		WherePK().
		Exec(context.Background())

	return err
}
