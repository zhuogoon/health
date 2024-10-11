package db

import (
	"health_backend/global"
	"health_backend/models"
	"health_backend/models/response"
)

func GetCount() (*response.GetCount, error) {
	count := &response.GetCount{}
	var doctorCount int64
	err := global.DB.Model(&models.Doctor{}).Count(&doctorCount).Error
	if err != nil {
		return count, err
	}

	var patientCount int64
	err = global.DB.Model(&models.Patient{}).Count(&patientCount).Error
	if err != nil {
		return count, err
	}

	var checkCount int64
	err = global.DB.Model(&models.CheckProject{}).Count(&checkCount).Error
	if err != nil {
		return count, err
	}
	count.DoctorCount = doctorCount
	count.PatientCount = patientCount
	count.CheckProjectCount = checkCount
	return count, nil
}

func DoctorInfo() ([]response.DoctorInfo, error) {
	var d []response.DoctorInfo
	err := global.DB.Model(&models.Doctor{}).Select("id,name,honor,job_title,job_type,phone").Find(&d).Error
	return d, err
}

func PatientInfo() ([]models.Patient, error) {
	var p []models.Patient
	err := global.DB.Model(&models.Patient{}).Find(&p).Error
	return p, err
}
