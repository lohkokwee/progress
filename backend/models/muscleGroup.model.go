package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type MuscleGroup struct {
	gorm.Model
	UserID uuid.UUID
	Name   string
}
