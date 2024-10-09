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
