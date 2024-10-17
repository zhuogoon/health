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

func DoctorInfo() ([]response.DoctorCard, error) {
	var d []response.DoctorCard
	err := global.DB.Table("doctors").
		Select("doctors.id, doctors.name, doctors.honor, doctors.job_title, doctors.job_type, doctors.phone, users.avatar").
		Joins("left join users on users.id = doctors.user_id").
		Find(&d).Error
	return d, err
}

func PatientInfo() ([]models.Patient, error) {
	var p []models.Patient
	err := global.DB.Model(&models.Patient{}).Find(&p).Error
	return p, err
}

func DeleteDoctor(id int) error {
	if err := global.DB.Model(&models.Doctor{}).Where("id = ?", id).Delete(&models.Doctor{}).Error; err != nil {
		return err
	}
	d, err := GetUserIdById(uint(id))
	if err != nil {
		return err

	}
	if err := global.DB.Model(&models.User{}).Where("id = ?", d).Delete(&models.User{}).Error; err != nil {
		return err
	}
	return nil
}

func DeletePatient(id int) error {
	return global.DB.Model(&models.Patient{}).Where("id = ?", id).Delete(&models.Patient{}).Error
}
