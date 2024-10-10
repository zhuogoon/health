package models

import "gorm.io/gorm"

type Case struct {
	gorm.Model
	PatientID uint `gorm:"index;uniqueIndex:patient_doctor_time_idx"`
	DoctorID  uint `gorm:"index;uniqueIndex:patient_doctor_time_idx"`
	Title     string
	Content   string
	Patient   *Patient `gorm:"foreignKey:PatientID"`
	Doctor    *Doctor  `gorm:"foreignKey:DoctorID"`
}
