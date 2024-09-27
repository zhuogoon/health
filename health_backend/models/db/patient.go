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
		Age:            p.Age,
		Sex:            p.Sex,
		MedicalHistory: p.MedicalHistory,
		Phone:          p.Phone,
		Address:        p.Address,
		Allergens:      p.Allergens,
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
