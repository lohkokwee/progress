package main

import (
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/lohkokwee/progress/backend/controllers"
	"github.com/lohkokwee/progress/backend/initializers"
	"github.com/lohkokwee/progress/backend/routes"
)

var (
  server *gin.Engine

  AuthController controllers.AuthController
  AuthRouteController routes.AuthRouteController

  UserController controllers.UserController
  UserRouteController routes.UserRouteController
)

func init() {
  config, err := initializers.LoadConfig(".")
  if err != nil {
    log.Fatal("? Could not load environment variables. ", err)
  }

  initializers.ConnectDB(&config)

  AuthController = controllers.NewAuthController(initializers.DB)
  AuthRouteController = routes.NewAuthRouteController(AuthController)

  UserController = controllers.NewUserController(initializers.DB)
  UserRouteController = routes.NewRouteUserController(UserController)

  server = gin.Default()
}

func main() {
  config, err := initializers.LoadConfig(".")
  if err != nil {
    log.Fatal("? Could not load environment variables. ", err)
  }

  corsConfig := cors.DefaultConfig()
  corsConfig.AllowOrigins = []string{"http://localhost:8000", config.ClientOrigin}
  corsConfig.AllowCredentials = true
  corsConfig.AllowHeaders = []string{"Authorization"} 

  server.Use(cors.New(corsConfig))

  router := server.Group("/api")
  router.GET("/healthchecker", func(ctx *gin.Context) {
    message := "Successful ping to progress app backend."
    ctx.JSON(http.StatusOK, gin.H{
      "status": http.StatusOK,
      "message": message,
    })
  })
  AuthRouteController.AuthRoute(router)
  UserRouteController.UserRoute(router)
  log.Fatal(server.Run(":" + config.ServerPort))
}
