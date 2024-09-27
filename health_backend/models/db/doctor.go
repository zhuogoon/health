package db

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"health_backend/global"
	"health_backend/models"
	"health_backend/models/request"
)

func CreateDoctor(d *request.Doctor) error {

	pwd, err := bcrypt.GenerateFromPassword([]byte(d.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	err = global.DB.Transaction(func(tx *gorm.DB) error {
		user := &models.User{
			Username: d.Username,
			Password: string(pwd),
			Role:     models.Doc,
		}
		err := tx.Model(&models.User{}).Create(&user).Error
		if err != nil {
			return err
		}
		doctor := &models.Doctor{
			UserId:   user.ID,
			Name:     d.Name,
			Honor:    d.Honor,
			JobTitle: d.JobTitle,
			JobType:  d.JobType,
			Phone:    d.Phone,
		}
		err = tx.Model(&models.Doctor{}).Create(&doctor).Error
		if err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		return err
	}
	return nil
}
