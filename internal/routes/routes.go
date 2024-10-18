package routes

import (
	"main/internal/controllers"

	"github.com/kataras/iris/v12"
)

func RegisterRoutes(app *iris.Application) {
	homeController := new(controllers.HomeController)

	// landing page
	app.Get("/", homeController.Get)
}
