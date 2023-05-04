package main

import (
	"github.com/gin-gonic/gin"
	"github.com/lohkokwee/progress/backend/initializers"
)

func init() {
  initializers.LoadEnvVariables()
  initializers.ConnectToDb()
  initializers.SyncDatabase()
}

func main() {
  router := gin.Default()
  router.GET("/ping", func(ctx *gin.Context) {
    ctx.JSON(200, gin.H{
      "Message": "pong",
    })
  })

  router.Run()
}
