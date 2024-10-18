package controllers

import (
	"html/template"
	"net/http"

	"github.com/kataras/iris/v12"
)

type HomeController struct{}

func (c *HomeController) Get(ctx iris.Context) {
	tmpl, err := template.ParseFiles("web/dist/index.html")
	if err != nil {
		http.Error(ctx.ResponseWriter(), err.Error(), http.StatusInternalServerError)
		return
	}

	err = tmpl.Execute(ctx.ResponseWriter(), nil)
	if err != nil {
		http.Error(ctx.ResponseWriter(), err.Error(), http.StatusInternalServerError)
		return
	}

	if err != nil {
		ctx.Application().Logger().Errorf("Error rendering template: %v", err)
		ctx.StatusCode(iris.StatusInternalServerError)
		ctx.WriteString("Internal Server Error")
	}
}
