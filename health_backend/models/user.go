package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username string `gorm:"username" json:"username"`
	Password string `gorm:"password" json:"password"`
	Role     Role   `gorm:"type:ENUM('admin', 'patient', 'doctor');"`
}

type Role string

const (
	Admin   Role = "admin"
	Patient Role = "patient"
	Doctor  Role = "doctor"
)
