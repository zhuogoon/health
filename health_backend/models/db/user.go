package db

import (
	"golang.org/x/crypto/bcrypt"
	"health_backend/global"
	"health_backend/models"
)

func Register(username, password string, role models.Role) error {
	pwd, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user := &models.User{
		Username: username,
		Password: string(pwd),
		Role:     role,
	}

	return global.DB.Model(&models.User{}).Create(&user).Error
}
