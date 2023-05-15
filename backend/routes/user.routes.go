package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/lohkokwee/progress/backend/controllers"
	"github.com/lohkokwee/progress/backend/middleware"
)

type UserRouteController struct {
	userController controllers.UserController
}

func NewRouteUserController(userController controllers.UserController) UserRouteController {
	return UserRouteController{userController}
}

func (uc *UserRouteController) UserRoute(rg *gin.RouterGroup) {
	router := rg.Group("/users")
	router.GET("/me", middleware.DeserialiseUser(), uc.userController.GetUser)
}