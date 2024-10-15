package models

import "gorm.io/gorm"

type Appointment struct {
	//预约表2
	gorm.Model
	TimeID    int    `gorm:"column:time_id" json:"time_id"`
	PatientID uint   `gorm:"column:patient_id" json:"patient_id"`
	DoctorID  uint   `gorm:"column:doctor_id" json:"doctor_id"`
	Year      string `gorm:"column:year" json:"year"`
	Month     string `gorm:"column:month" json:"month"`
	Day       string `gorm:"column:day" json:"day"`
	Status    bool   `gorm:"column:status" json:"status" default:"false"`
}
