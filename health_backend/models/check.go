package models

import "gorm.io/gorm"

type ProjectStatus string

const (
	StatusUnchecked  ProjectStatus = "未检查"
	StatusInProgress ProjectStatus = "检查中"
	StatusCompleted  ProjectStatus = "已完成"
)

type Check struct {
	gorm.Model
	CheckProjectId uint          `json:"check_project_id" gorm:"check_project_id"`
	PatientId      uint          `json:"patient_id" gorm:"patient_id"`
	DoctorId       uint          `json:"doctor_id" gorm:"doctor_id"`
	Status         ProjectStatus `gorm:"type:enum('未检查', '检查中', '已完成');default:'未检查'" json:"status"`
}
