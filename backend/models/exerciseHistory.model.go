package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ExerciseHistory struct {
	gorm.Model
	UserID      uuid.UUID
	ExerciseID  uint
	Exercise    Exercise
	Repetitions int
	Weight      int
	LogID       uint
	Log         Log
}
