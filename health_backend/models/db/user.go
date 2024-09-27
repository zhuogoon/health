package db

import (
	"errors"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"health_backend/global"
	"health_backend/models"
)

// Register 注册
func Register(username, password string) error {
	pwd, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user := &models.User{
		Username: username,
		Password: string(pwd),
		Role:     models.Patient,
	}

	return global.DB.Model(&models.User{}).Create(&user).Error
}

// IsUsername 判断用户是否存在
func IsUsername(username string) (bool, error) {
	var user models.User
	err := global.DB.Model(&models.User{}).Where("username = ?", username).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return false, nil // 用户不存在
		}
		return false, err // 其他错误
	}
	return true, nil // 用户存在
}

// IsPassword 查询密码是否正确
func IsPassword(username, password string) error {
	var user models.User
	err := global.DB.Model(&models.User{}).Where("username = ?", username).First(&user).Error
	if err != nil {
		return err
	}
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return err
	}
	return nil
}

// FindRole 查询用户的身份
func FindRole(username string) (models.Role, error) {
	user := models.User{}

	err := global.DB.Model(&models.User{}).Where("username = ?", username).First(&user).Error
	if err != nil {
		return "", err
	}
	return user.Role, nil
}

// GetIdByUsername 查询用户id
func GetIdByUsername(username string) (uint, error) {
	user := models.User{}

	err := global.DB.Model(&models.User{}).Where("username = ?", username).First(&user).Error
	if err != nil {
		return 0, err
	}
	return user.ID, nil
}

// UpdatePassword 更新密码
func UpdatePassword(password string) error {
	return global.DB.Model(&models.User{}).Where("id = ?", global.UserId).Update("password", password).Error
}

func CancelUser() error {
	return global.DB.Where("id = ?", global.UserId).Delete(&models.User{}).Error
}
