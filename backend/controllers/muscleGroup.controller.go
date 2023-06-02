package controllers

import (
	"errors"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/lohkokwee/progress/backend/models"
	"github.com/lohkokwee/progress/backend/requests"
	"gorm.io/gorm"
)

type MuscleGroupController struct {
	DB *gorm.DB
}

func NewMuscleGroupController(DB *gorm.DB) MuscleGroupController {
	return MuscleGroupController{DB}
}

func (mc *MuscleGroupController) CreateMuscleGroup(ctx *gin.Context) {
	currentUser := ctx.MustGet("currentUser").(models.User)
	var payload *requests.CreateMuscleGroupInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status":  http.StatusBadRequest,
			"message": err.Error(),
		})
		return
	}

	newMuscleGroup := models.MuscleGroup{
		UserID: currentUser.ID,
		Name:   payload.Name,
	}

	result := mc.DB.Create(&newMuscleGroup)
	if result.Error != nil {
		if strings.Contains(result.Error.Error(), "duplicate key value violates unique") {
			ctx.JSON(http.StatusConflict, gin.H{
				"status":  http.StatusConflict,
				"message": "Muscle group with that email already exists",
			})
			return
		} else {
			ctx.JSON(http.StatusBadGateway, gin.H{
				"status":  http.StatusBadGateway,
				"message": "Something bad happened",
			})
			return
		}
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"status":  http.StatusCreated,
		"message": newMuscleGroup,
	})
}

func (mc *MuscleGroupController) GetMuscleGroup(ctx *gin.Context) {
	currentUser := ctx.MustGet("currentUser").(models.User)
	queryMuscleGroup := models.MuscleGroup{
		UserID: currentUser.ID,
		Name:   ctx.Param("muscleGroupName"),
	}
	var resultMuscleGroup models.MuscleGroup
	result := mc.DB.Where(&queryMuscleGroup).Find(&resultMuscleGroup)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, gin.H{
				"status":  http.StatusNotFound,
				"message": "Muscle group does not exist",
			})
			return
		} else {
			ctx.JSON(http.StatusBadGateway, gin.H{
				"status":  http.StatusBadGateway,
				"message": result.Error.Error(),
			})
			return
		}
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"status":  http.StatusCreated,
		"message": resultMuscleGroup,
	})
}

func (mc *MuscleGroupController) GetAllMuscleGroups(ctx *gin.Context) {
	currentUser := ctx.MustGet("currentUser").(models.User)
	queryMuscleGroups := models.MuscleGroup{
		UserID: currentUser.ID,
	}
	var resultMuscleGroups []models.MuscleGroup
	result := mc.DB.Where(&queryMuscleGroups).Find(&resultMuscleGroups)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, gin.H{
				"status":  http.StatusNotFound,
				"message": "No muscle groups exist",
			})
			return
		} else {
			ctx.JSON(http.StatusBadGateway, gin.H{
				"status":  http.StatusBadGateway,
				"message": result.Error.Error(),
			})
			return
		}
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"status":  http.StatusCreated,
		"message": resultMuscleGroups,
	})
}
