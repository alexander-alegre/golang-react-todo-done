package main

import (
	"log"
	"main/internal/pkg/db"
	"main/internal/routes"

	"github.com/joho/godotenv"
	"github.com/kataras/iris/v12"
)

func main() {
	if err := initEnv(); err != nil {
		log.Fatal(err)
	}

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

func initEnv() error {
	if err := godotenv.Load(); err != nil {
		return err
	}

	return db.Init()
}
