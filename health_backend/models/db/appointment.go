package db

import (
	"fmt"
	"github.com/sirupsen/logrus"
	"health_backend/global"
	"health_backend/models"
	"health_backend/models/response"
	"time"
)

// Increase 操作数据库：添加方法
func Increase(appointment *models.Appointment) error {
	return global.DB.Create(&appointment).Error
}

// List 获取所有预约
func List() ([]response.AppointmentCard, error) {
	var appointmentCards []response.AppointmentCard
	err := global.DB.Table("appointments").
		Select(`appointments.id, doctors.name as doctor_name, doctors.job_title as doctor_title, doctors.job_type as doctor_type, 
        users.avatar as doctor_avatar, appointments.year, appointments.month, appointments.day, appointments.time_id, appointments.status`).
		Joins("left join doctors on doctors.id = appointments.doctor_id").
		Joins("left join users on users.id = doctors.user_id").
		Where("appointments.deleted_at IS NULL").
		Scan(&appointmentCards).Error
	if err != nil {
		return nil, err
	}

	// Construct the date string based on year, month, day, and time_id
	for i := range appointmentCards {
		appointmentCards[i].Date = constructDate(appointmentCards[i].Year, appointmentCards[i].Month, appointmentCards[i].Day, appointmentCards[i].TimeID)
	}

	return appointmentCards, nil
}

// Delete  根据id删除预约
func Delete(id uint) error {
	logrus.Info(id)
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

func QueryAppointments(from, to time.Time) ([]response.AppointmentCard, error) {
	var appointmentCards []response.AppointmentCard
	err := global.DB.Table("appointments").
		Select(`appointments.id, doctors.name as doctor_name, doctors.job_title as doctor_title, doctors.job_type as doctor_type,
			users.avatar as doctor_avatar, appointments.year, appointments.month, appointments.day, appointments.time_id, appointments.status`).
		Joins("left join doctors on doctors.id = appointments.doctor_id").
		Joins("left join users on users.id = doctors.user_id").
		Where("appointments.created_at BETWEEN ? AND ?", from, to).
		Scan(&appointmentCards).Error
	if err != nil {
		return nil, err
	}

	// Construct the date string based on year, month, day, and time_id
	for i := range appointmentCards {
		appointmentCards[i].Date = constructDate(appointmentCards[i].Year, appointmentCards[i].Month, appointmentCards[i].Day, appointmentCards[i].TimeID)
	}

	return appointmentCards, nil
}

func constructDate(year int, month int, day int, timeID int) string {
	timeMap := map[int]string{
		1: "08:00-09:00",
		2: "09:00-10:00",
		3: "10:00-11:00",
		4: "11:00-12:00",
		5: "14:00-15:00",
		6: "15:00-16:00",
		7: "16:00-17:00",
		// Add more mappings as needed
	}

	timeRange, exists := timeMap[timeID]
	if !exists {
		timeRange = "Unknown"
	}

	return fmt.Sprintf("%04d-%02d-%02d %s", year, month, day, timeRange)
}

func GetLatestAppointmentByPatientID(uid uint) (*response.LastAppointment, error) {
	var userID uint
	err := global.DB.Table("patients").Select("id").Where("user_id = ?", uid).Scan(&userID).Error
	if err != nil {
		return nil, err
	}
	logrus.Info(userID)
	var latestAppointment response.LastAppointment
	err = global.DB.Table("appointments").
		Select(`doctors.name as doctor_name, doctors.job_type as doctor_type, users.avatar as doctor_img, appointments.updated_at as update_time, appointments.year, appointments.month, appointments.day, appointments.time_id`).
		Joins("left join doctors on doctors.id = appointments.doctor_id").
		Joins("left join users on users.id = doctors.user_id").
		Where("appointments.patient_id = ?", userID).
		Order("appointments.created_at DESC").
		Limit(1).
		Scan(&latestAppointment).Error
	if err != nil {
		return nil, err
	}
	// Construct the date string based on year, month, day, and time_id
	latestAppointment.Date = constructDate(
		latestAppointment.Year,
		latestAppointment.Month,
		latestAppointment.Day,
		latestAppointment.TimeID)
	return &latestAppointment, nil
}
