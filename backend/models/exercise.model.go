package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Exercise struct {
	gorm.Model
	UserID        uuid.UUID
	Name          string
	MuscleGroupID uint64
	MuscleGroup   MuscleGroup
}
