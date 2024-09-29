package db

import (
	"health_backend/global"
	"health_backend/models"
	"health_backend/models/response"
)

func AddCheckProject(name, room string) error {
	ch := &models.CheckProject{
		Name: name,
		Room: room,
	}
	return global.DB.Model(&models.CheckProject{}).Create(&ch).Error
}

func UpdateCheck(id uint, name, room string) error {
	ch := &models.CheckProject{
		Name: name,
		Room: room,
	}
	return global.DB.Model(&models.CheckProject{}).Where("id = ?", id).Updates(ch).Error
}

func DeleteCheck(id uint) error {
	return global.DB.Model(&models.CheckProject{}).Where("id = ?", id).Delete(&models.CheckProject{}).Error
}

func GetCheckProjects() ([]response.CheckProjectResponse, error) {
	var projects []response.CheckProjectResponse
	err := global.DB.Model(&models.CheckProject{}).Select("id, name, room").Find(&projects).Error
	return projects, err
}
