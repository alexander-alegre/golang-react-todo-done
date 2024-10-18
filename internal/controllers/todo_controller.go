package controllers

import (
	"database/sql"
	"main/internal/models"
	"main/internal/services"
	"time"

	"github.com/kataras/iris/v12"
)

type TodoController struct{}

type APIErrors struct {
	Message string `json:"message"`
	Details string `json:"details,omitempty"`
}

type APIResponse struct {
	Success bool   `json:"success"`
	Details string `json:"details,omitempty"`
}

func (c *TodoController) Get(ctx iris.Context) {
	todos, err := services.GetTodos()
	var errors APIErrors

	if err != nil {
		errors.Message = "Unexpected error"
		ctx.JSON(errors)
		return
	}

	ctx.JSON(todos)
}

type CreateTodoRequest struct {
	Task string
}

func (c *TodoController) Post(ctx iris.Context) {
	var errors APIErrors
	var params CreateTodoRequest
	ctx.ReadJSON(&params)

	if len(params.Task) < 5 {
		errors.Message = "Task required"
		errors.Details = "The task must be at least 5 characters long"
		ctx.JSON(errors)
		return
	}

	// create todo
	var todo models.Todo
	todo.Task = params.Task
	services.CreateTodo(&todo)

	// get all todos
	todos, err := services.GetTodos()

	if err != nil {
		errors.Message = "Unexpected error"
		ctx.JSON(errors)
		return
	}

	ctx.JSON(todos)
}

type UpdateTodoRequest struct {
	Task   string
	TaskID int
}

func (c *TodoController) Put(ctx iris.Context) {
	var params UpdateTodoRequest
	ctx.ReadJSON(&params)

	var errors APIErrors

	if len(params.Task) <= 5 {
		errors.Message = "Task required"
		errors.Details = "The task must be at least 5 characters long"
		ctx.JSON(errors)
		return
	}

	todo := models.Todo{
		ID:        params.TaskID,
		Task:      params.Task,
		UpdatedAt: time.Now(),
	}
	services.UpdateTodo(&todo)

	// get all todos
	todos, err := services.GetTodos()

	if err != nil {
		errors.Message = "Unexpected error"
		ctx.JSON(errors)
		return
	}

	ctx.JSON(todos)
}

type DeleteTodoRequest struct {
	TaskID int
}

func (c *TodoController) Delete(ctx iris.Context) {
	var params DeleteTodoRequest
	ctx.ReadJSON(&params)

	var errors APIErrors

	if params.TaskID <= 0 {
		errors.Message = "Task ID required"
		errors.Details = "Please provide the task ID."
		ctx.JSON(errors)
	}

	// mark as deleted
	todo := models.Todo{
		ID:        params.TaskID,
		UpdatedAt: time.Now(),
		Deleted:   true,
		DeletedAt: sql.NullTime{Time: time.Now()},
	}
	services.UpdateTodo(&todo)

	// get all todos
	todos, err := services.GetTodos()

	if err != nil {
		errors.Message = "Unexpected error"
		ctx.JSON(errors)
		return
	}

	ctx.JSON(todos)
}
