package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username string `gorm:"column:username;size:20;not null" json:"username"`
	Password string `gorm:"column:password;size:100;not null" json:"password"`
	Role     Role   `gorm:"column:role;type:ENUM('admin', 'patient', 'doctor');not null"`
	Avatar   string `gorm:"column:avatar;size:64" json:"avatar"`
}

type Role string

const (
	Adm Role = "admin"
	Pat Role = "patient"
	Doc Role = "doctor"
)
