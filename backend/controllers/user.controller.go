package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lohkokwee/progress/backend/models"
	"github.com/lohkokwee/progress/backend/responses"
	"gorm.io/gorm"
)

type UserController struct {
	DB *gorm.DB
}

func NewUserController (DB *gorm.DB) UserController {
	return UserController{DB}
}

func (uc *UserController) GetUser(ctx *gin.Context) {
	currentUser := ctx.MustGet("currentUser").(models.User)
	
	userResponse := &responses.UserResponse{
		ID: currentUser.ID,
		Name: currentUser.Name,
		Email: currentUser.Email,
		CreatedAt: currentUser.CreatedAt,
		UpdatedAt: currentUser.UpdatedAt,
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"user": userResponse,
	})
}

func (uc *UserController) GetAllUsers(ctx *gin.Context) {
	
}