package requests

type CreateMuscleGroupInput struct {
	Name   string    `json:"name" binding:"required"`
}
