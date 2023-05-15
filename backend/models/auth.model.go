package models

import (
	"time"

	"github.com/google/uuid"
)

type SignUpInput struct {
	Email    string `json:"email" binding:"required"`
	Name     string `json:"name" binding:"required"`
	Password string `json:"password" binding:"required,min=8"`
}

type SignInInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type UserResponse struct {
	ID        uuid.UUID `json:"id,omitempty"`
	Name      string    `json:"name,omitempty"`
	Email     string    `json:"email,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
