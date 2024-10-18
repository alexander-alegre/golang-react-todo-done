package main

import (
	"main/internal/routes"

	"github.com/kataras/iris/v12"
)

func main() {
	// create app
	app := iris.New()

	// register views
	templ := iris.HTML("web/dist", ".html")
	app.RegisterView(templ)

	// serve static files
	app.HandleDir("/assets", iris.Dir("./web/dist/assets"))
	app.HandleDir("/", iris.Dir("./web/public"))

	// setup routes
	routes.RegisterRoutes(app)

	// start the server
	app.Listen(":3000")
}
