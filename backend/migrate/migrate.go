package main

import (
	"fmt"
	"log"

	"github.com/lohkokwee/progress/backend/initializers"
	"github.com/lohkokwee/progress/backend/models"
)

func init() {
	config, err := initializers.LoadConfig(".")
	if err != nil {
		log.Fatal("? Could not load environment variables. ", err)
	}

	initializers.ConnectDB(&config)
}

func main() {
	initializers.DB.AutoMigrate(&models.User{})
	initializers.DB.AutoMigrate(&models.MuscleGroup{})
	initializers.DB.AutoMigrate(&models.Exercise{})
	initializers.DB.AutoMigrate(&models.ExerciseHistory{})
	initializers.DB.AutoMigrate(&models.Log{})
	fmt.Println("? Migration complete.")
}
