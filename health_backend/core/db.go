package core

import (
	"fmt"
	"github.com/sirupsen/logrus"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"health_backend/global"
	"health_backend/models"
)

// InitDatabase 初始化数据库
func InitDatabase() {
	if global.Config.Mysql.Host == "" {
		logrus.Warn("未配置Mysql，取消连接")
		return
	}
	dsn := global.Config.Mysql.Dsn()

	db, err := gorm.Open(mysql.Open(dsn))
	if err != nil {
		logrus.Fatalf(fmt.Sprintf("[%s] mysql连接失败", dsn))
		return
	}
	global.DB = db
	logrus.Info("mysql 连接成功")
}

// InitCreateDB 自动迁移
func InitCreateDB() {
	err := global.DB.AutoMigrate(
		&models.User{},
		&models.Doctor{},
		&models.Patient{},
		&models.CheckProject{},
		&models.Check{},
		&models.Case{},
		&models.Appointment{},
	)
	if err != nil {
		logrus.Error("表自动迁移失败")
		return
	}
	logrus.Info("表自动迁移成功")
}
