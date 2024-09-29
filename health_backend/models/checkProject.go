package models

import "gorm.io/gorm"

type CheckProject struct {
	gorm.Model
	Name string `json:"name" gorm:"column:name;size:20"`
	Room string `json:"room" gorm:"column:room;size:100"`
}
