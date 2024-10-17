package db

import (
	"gorm.io/gorm"
	"health_backend/global"
	"health_backend/models"
	"health_backend/models/request"
	"time"
)

func CaseIncrease(patientID uint, doctorID uint, title string, content string) error {
	ca := &models.Case{}
	ca.PatientID = patientID
	ca.DoctorID = doctorID
	ca.Title = title
	ca.Content = content
	err := global.DB.Create(&ca).Error
	if err != nil {
		return err
	}
	return nil
}

// CaseList 2.获取病例

func CaseList() ([]models.Case, error) {
	var cases []models.Case
	err := global.DB.Find(&cases).Error
	if err != nil {
		return nil, err
	}
	return cases, nil
}

// CaseById 根据id获取病例
func CaseById(id string) (*models.Case, error) {
	var cases = &models.Case{}
	err := global.DB.Where("id = ?", id).Preload("Patient").Preload("Doctor").First(&cases).Error
	if err != nil {
		return cases, err
	}
	return cases, nil
}

// CaseDelete 3.删除病例
func CaseDelete(id uint) error {
	err := global.DB.Where("id = ?", id).Delete(&models.Case{}).Error
	if err != nil {
		return err
	}
	return nil
}

// CaseUpdate 修改病例
func CaseUpdate(id uint, content string, title string, checkIds string) error {
	err := global.DB.Model(&models.Case{}).Where("id = ?", id).Update("check_id", checkIds).Update("content", content).Update("title", title).Update("status", true).Error
	if err != nil {
		return err
	}
	return nil
}

// TimeInquiry 根据时间查询病例
func TimeInquiry(db *gorm.DB, queryTime time.Time) ([]models.Case, error) {
	var cases []models.Case
	result := db.Where("created_at > ?", queryTime).Find(&cases)
	if result.Error != nil {
		return nil, result.Error
	}
	return cases, nil
}

// Pagination 分页查询
func Pagination(db *gorm.DB, pagination request.PaginationParams) ([]models.Case, error) {
	var cases []models.Case
	result := db.Offset(pagination.Offset).Limit(pagination.Limit).Find(&cases)
	if result.Error != nil {
		return nil, result.Error
	}
	return cases, nil
}
