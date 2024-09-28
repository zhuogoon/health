package db

import (
	"health_backend/global"
	"health_backend/models"
	"health_backend/models/request"
)

func CreatePatient(p *request.CreatePatient) error {
	patient := &models.Patient{
		UserID:         global.UserId,
		Name:           p.Name,
		Height:         p.Height,
		Weight:         p.Weight,
		Sex:            p.Sex,
		MedicalHistory: p.MedicalHistory,
		Phone:          p.Phone,
		Address:        p.Address,
		Allergens:      p.Allergens,
		Birthday:       p.Birthday,
	}
	return global.DB.Model(&models.Patient{}).Create(&patient).Error
}

func GetPatientInfo() (*models.Patient, error) {
	p := &models.Patient{}
	err := global.DB.Model(&models.Patient{}).Where("user_id = ?", global.UserId).First(&p).Error
	if err != nil {
		return p, err
	}
	return p, nil
}

func UpdateUserStatus() error {
	return global.DB.Model(&models.User{}).Where("id = ?", global.UserId).Update("status", true).Error
}

func GetInfoById() (*models.User, error) {
	user := &models.User{}
	err := global.DB.Model(&models.User{}).Where("id = ?", global.UserId).First(&user).Error
	if err != nil {
		return user, err
	}
	return user, nil
}
