package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username string `gorm:"username;size:20;not null" json:"username"`
	Password string `gorm:"password;size:100;not null" json:"password"`
	Role     Role   `gorm:"type:ENUM('admin', 'patient', 'doctor');not null"`
}

type Role string

const (
	Admin   Role = "admin"
	Patient Role = "patient"
	Doc     Role = "doctor"
)
