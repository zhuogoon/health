package db

import (
	"health_backend/global"
	"health_backend/models"
)

// Increase 操作数据库：添加方法
func Increase(time_id int, patientID uint, doctorID uint) error {
	aot := &models.Appointment{}
	aot.TimeID = time_id
	aot.PatientID = patientID
	aot.DoctorID = doctorID
	err := global.DB.Create(&aot).Error
	if err != nil {
		return err
	}
	return nil

}

// List 获取所有预约
func List() ([]models.Appointment, error) {
	var appointments []models.Appointment
	err := global.DB.Preload("Patient.Name").Preload("Doctor").Find(&appointments).Error
	if err != nil {
		return nil, err
	}
	return appointments, nil
}

// Delete  根据id删除预约
func Delete(id uint) error {
	err := global.DB.Where("id = ?", id).Delete(&models.Appointment{}).Error
	if err != nil {
		return err
	}
	return nil
}

// Update 修改预约
func Update(id uint, timeID int) error {
	err := global.DB.Model(&models.Appointment{}).Where("id = ?", id).Update("time_id", timeID).Error
	if err != nil {
		return err
	}
	return nil
}
