package initializers

import "github.com/lohkokwee/progress/backend/models"

func SyncDatabase() {
	DB.AutoMigrate(&models.User{})
}