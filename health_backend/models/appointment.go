package models

import "gorm.io/gorm"

type Appointment struct {
	//预约表
	gorm.Model
	TimeID    int
	PatientID uint     `gorm:"index;uniqueIndex:patient_doctor_time_idx"`
	DoctorID  uint     `gorm:"index;uniqueIndex:patient_doctor_time_idx"`
	Patient   *Patient `gorm:"foreignKey:PatientID"`
	Doctor    *Doctor  `gorm:"foreignKey:DoctorID"`
}
