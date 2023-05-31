package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Log struct {
	gorm.Model
	UserID            uuid.UUID
	Name              string
	ExerciseHistories []ExerciseHistory
	Notes             string
}
