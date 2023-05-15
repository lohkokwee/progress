package middleware

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/lohkokwee/progress/backend/initializers"
	"github.com/lohkokwee/progress/backend/models"
	"github.com/lohkokwee/progress/backend/utils"
)

func DeserialiseUser() gin.HandlerFunc {
	// Note: returns early to stop execution past middleware
	return func(ctx *gin.Context) {
		var token string
		cookie, err := ctx.Cookie("token")

		authorisationHeader := ctx.Request.Header.Get("Authorization")
		fields := strings.Fields(authorisationHeader)

		if len(fields) != 0 && fields[0] == "Bearer" {
			token = fields[1]
		} else if err == nil {
			token = cookie
		}

		if token == "" {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"status": http.StatusText(http.StatusUnauthorized),
				"message": err.Error(),
			})
			return
		}

		config, _ := initializers.LoadConfig(".")
		sub, err := utils.ValidateToken(token, config.TokenSecret)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"status": http.StatusText(http.StatusUnauthorized),
				"message": err.Error(),
			})
			return
		}

		var user models.User
		result := initializers.DB.First(&user, "id = ?", fmt.Sprint(sub)) // Note: subject in JWT claims object is a user ID - issued earlier
		if result.Error != nil {
			ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{
				"status": http.StatusText(http.StatusForbidden),
				"message": "user belonging to this token no longer exists",
			})
			return
		}

		ctx.Set("currentUser", user)
		ctx.Next()
	}
}