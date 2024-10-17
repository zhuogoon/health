package db

import (
	"health_backend/global"
	"health_backend/models"
	"health_backend/models/request"
	"health_backend/models/response"
	"time"
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

func UpdatePatient(p *request.CreatePatient) error {
	return global.DB.Model(&models.Patient{}).Where("user_id = ?", global.UserId).Select("address", "allergens", "birthday", "height", "medical_history", "name", "phone", "sex", "weight").Updates(&p).Error
}

func GetPatientInfoById(id string) (*response.GetInfoByIdResp, error) {
	p := &response.GetInfoByIdResp{}
	if err := global.DB.Model(&models.Patient{}).Select("phone, address, height, weight, medical_history, allergens, sex, name, birthday").Where("id = ?", id).Find(&p).Error; err != nil {
		return nil, err
	}

	// Calculate the age based on the birthday
	if p.Birthday != nil {
		today := time.Now()
		age := today.Year() - p.Birthday.Year()
		if today.YearDay() < p.Birthday.YearDay() {
			age--
		}
		p.Age = age
	}

	return p, nil
}

func GetPatientIdByUserId() (uint, error) {
	p := &models.Patient{}
	if err := global.DB.Model(&models.Patient{}).Where("user_id = ?", global.UserId).Order("created_at DESC").First(&p).Error; err != nil {
		return 0, err
	}
	return p.ID, nil
}
