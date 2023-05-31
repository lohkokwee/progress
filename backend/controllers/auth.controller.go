package controllers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/lohkokwee/progress/backend/initializers"
	"github.com/lohkokwee/progress/backend/models"
	"github.com/lohkokwee/progress/backend/utils"
	"gorm.io/gorm"
)

type AuthController struct {
	DB *gorm.DB
}

func NewAuthController(DB *gorm.DB) AuthController {
	return AuthController{DB}
}

// [...] SignUp User
func (ac *AuthController) SignUpUser(ctx *gin.Context) {
	var payload *models.SignUpInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status":  http.StatusBadRequest,
			"message": err.Error(),
		})
		return
	}

	hashedPassword, err := utils.HashPassword(payload.Password)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{
			"status":  http.StatusBadGateway,
			"message": err.Error(),
		})
		return
	}

	newUser := models.User{
		Name:     payload.Name,
		Email:    payload.Email,
		Password: hashedPassword,
	}

	result := ac.DB.Create(&newUser)
	if result.Error != nil && strings.Contains(result.Error.Error(), "duplicate key value violates unique") {
		ctx.JSON(http.StatusConflict, gin.H{
			"status":  http.StatusConflict,
			"message": "User with that email already exists",
		})
		return
	} else if result.Error != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{
			"status":  http.StatusBadGateway,
			"message": "Something bad happened",
		})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"status":  http.StatusCreated,
		"message": newUser,
	})
}

// [...] SignIn User
func (ac *AuthController) SignInUser(ctx *gin.Context) {
	var payload *models.SignInInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{
			"status":  http.StatusBadGateway,
			"message": err.Error(),
		})
		return
	}

	var user models.User
	result := ac.DB.First(&user, "email = ?", strings.ToLower(payload.Email))
	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status":  http.StatusBadRequest,
			"message": "Invalid email",
		})
		return
	}

	if err := utils.VerifyPassword(user.Password, payload.Password); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status":  http.StatusBadRequest,
			"message": "Invalid email or password",
		})
		return
	}

	config, _ := initializers.LoadConfig(".")
	token, err := utils.GenerateToken(config.TokenExpiresIn, user.ID, config.TokenSecret)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status":  http.StatusBadRequest,
			"message": err.Error(),
		})
		return
	}

	userResponse := &models.UserResponse{
		ID:        user.ID,
		Name:      user.Name,
		Email:     user.Email,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
	}

	ctx.SetCookie("token", token, config.TokenMaxAge*60, "/", "localhost", false, true)
	ctx.JSON(http.StatusOK, gin.H{
		"status":  http.StatusOK,
		"message": "Token generated",
		"data": gin.H{
			"token": token,
			"user":  userResponse,
		},
	})
}

// [...] SignOut User
func (ac *AuthController) LogoutUser(ctx *gin.Context) {
	ctx.SetCookie("token", "", -1, "/", "localhost", false, true)
	ctx.JSON(http.StatusOK, gin.H{
		"status":  http.StatusOK,
		"message": http.StatusText(http.StatusOK),
	})
}
