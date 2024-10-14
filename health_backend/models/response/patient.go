package response

import (
	"health_backend/models"
	"time"
)

type PatientInfo struct {
	Id             uint        `json:"id"`
	UserId         uint        `json:"user_id"`
	Name           string      `json:"name"`
	Height         float32     `json:"height"`
	Weight         float32     `json:"weight"`
	Age            int         `json:"age"`
	Sex            string      `json:"sex"`
	MedicalHistory string      `json:"medical_history"`
	Phone          string      `json:"phone"`
	Address        string      `json:"address"`
	Allergens      string      `json:"allergens"`
	Role           models.Role `json:"role"`
	Avatar         string      `json:"avatar"`
	Username       string      `json:"username"`
	Birthday       *time.Time  `json:"birthday"`
}

type GetInfoByIdResp struct {
	Phone          string `json:"phone"`
	Address        string `json:"address"`
	Height         string `json:"height"`
	Weight         string `json:"weight"`
	MedicalHistory string `json:"medical_history"`
	Allergens      string `json:"allergens"`
}
type GetAppointmentInfoByIdResp struct {
	TimeId int64 `json:"time_id"`
}
