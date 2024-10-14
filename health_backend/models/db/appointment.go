package db

import (
	"health_backend/global"
	"health_backend/models"
	"health_backend/models/response"
)

// Increase 操作数据库：添加方法
func Increase(appointment *models.Appointment) error {
	return global.DB.Create(&appointment).Error
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

// GetAppointmentInfoById 通过id拿到预约信息
func GetAppointmentInfoById(id uint) ([]response.GetAppointmentInfoByIdResp, error) {
	var d []response.GetAppointmentInfoByIdResp
	if err := global.DB.Model(&models.Appointment{}).Select("time_id").Where("patient_id = ?", id).Find(&d).Error; err != nil {
		return nil, err
	}
	return d, nil
}
