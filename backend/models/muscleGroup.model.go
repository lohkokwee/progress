package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type MuscleGroup struct {
	gorm.Model
	UserID uuid.UUID `gorm:"uniqueIndex:user_id_name"`
	Name   string    `gorm:"uniqueIndex:user_id_name"`
}
