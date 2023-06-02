package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/lohkokwee/progress/backend/controllers"
	"github.com/lohkokwee/progress/backend/middleware"
)

type MuscleGroupRouteController struct {
	muscleGroupController controllers.MuscleGroupController
}

func NewMuscleGroupRouteController(muscleGroupController controllers.MuscleGroupController) MuscleGroupRouteController {
	return MuscleGroupRouteController{muscleGroupController}
}

func (mc *MuscleGroupRouteController) MuscleGroupRoute(rg *gin.RouterGroup) {
	router := rg.Group("/muscleGroups")
	router.POST("/new", middleware.DeserialiseUser(), mc.muscleGroupController.CreateMuscleGroup)
	router.GET("/:muscleGroupName", middleware.DeserialiseUser(), mc.muscleGroupController.GetMuscleGroup)
	router.GET("/all", middleware.DeserialiseUser(), mc.muscleGroupController.GetAllMuscleGroups)
}