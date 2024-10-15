package models

import "gorm.io/gorm"

type Case struct {
	gorm.Model
	PatientID uint   `gorm:"column:patient_id" json:"patient_id"`
	DoctorID  uint   `gorm:"column:doctor_id" json:"doctor_id"`
	CheckID   string `gorm:"column:check_id" json:"check_id"`
	Title     string `gorm:"column:title" json:"title"`
	Content   string `gorm:"column:content" json:"content"`
	Status    bool   `gorm:"column:status" json:"status"`
}
