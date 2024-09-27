package models

import "gorm.io/gorm"

type Doctor struct {
	gorm.Model
	UserId   uint   `json:"user_id" gorm:"column:user_id;not null"`
	Name     string `json:"name" gorm:"column:name;size:64;not null"`
	Honor    string `json:"honor" gorm:"column:honor;size:255"`
	JobTitle string `json:"job_title" gorm:"column:job_title;size:64;not null"`
	JobType  string `json:"job_type" gorm:"column:job_type;size:64;not null"`
	Phone    string `json:"phone" gorm:"column:phone;size:20;not null"`
}
