package routes

import (
	"main/internal/controllers"

	"github.com/kataras/iris/v12"
)

func RegisterRoutes(app *iris.Application) {
	homeController := new(controllers.HomeController)
	todoController := new(controllers.TodoController)

	// landing page
	app.Get("/", homeController.Get)

	// API routes
	apiRoutes := app.Party("/api")
	{
		// todo routes
		apiRoutes.Get("/todo", todoController.Get)
		apiRoutes.Post("/todo", todoController.Post)
		apiRoutes.Put("/todo", todoController.Put)
		apiRoutes.Delete("/todo", todoController.Delete)
	}
}
