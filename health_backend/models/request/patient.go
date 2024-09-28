package request

import (
	"time"
)

type CreatePatient struct {
	Name           string     `json:"name"`
	Height         float32    `json:"height"`
	Weight         float32    `json:"weight"`
	Sex            bool       `json:"sex"`
	MedicalHistory string     `json:"medical_history"`
	Phone          string     `json:"phone"`
	Address        string     `json:"address"`
	Allergens      string     `json:"allergens"`
	Birthday       *time.Time `json:"birthday"`
}
