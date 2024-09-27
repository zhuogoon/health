package models

import (
	"gorm.io/gorm"
	"time"
)

type Patient struct {
	gorm.Model
	UserID         uint       `json:"user_id" gorm:"column:user_id;not null"`
	Name           string     `json:"name" gorm:"column:name;size:64;not null"`
	Height         float32    `json:"height" gorm:"column:height;type:double"`
	Weight         float32    `json:"weight" gorm:"column:weight;type:double"`
	Sex            bool       `json:"sex" gorm:"column:sex;type:bool;not null"`
	MedicalHistory string     `json:"medical_history" gorm:"column:medical_history;type:longtext;comment:'过往病史'"`
	Phone          string     `json:"phone" gorm:"column:phone;size:20;not null"`
	Address        string     `json:"address" gorm:"column:address;size:128"`
	Allergens      string     `json:"allergens" gorm:"column:allergens;size:255;comment:'过敏史'"`
	Birthday       *time.Time `json:"birthday" gorm:"column:birthday"`
}
