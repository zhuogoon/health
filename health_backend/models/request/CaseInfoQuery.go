package request

import "time"

type CaseInfoQuery struct {
	Id          uint      `json:"id"`
	Title       string    `json:"title"`
	Content     string    `json:"content"`
	DoctorName  string    `json:"doctor_name"`
	CheckID     string    `json:"check_id"`
	DoctorID    uint      `json:"doctor_id"`
	PatientName string    `json:"patient_name"`
	Sex         string    `json:"sex"`
	Age         int       `json:"age"`
	PatientID   uint      `json:"patient_id"`
	CreatedAt   time.Time `json:"createdAt"`
}
