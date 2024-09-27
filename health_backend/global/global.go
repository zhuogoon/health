package global

import (
	"context"
	"github.com/go-redis/redis/v8"
	"gorm.io/gorm"
	"health_backend/config"
	"health_backend/models"
)

var (
	Config *config.Config
	DB     *gorm.DB
	UserId uint
	RDB    *redis.Client
	Role   models.Role
)
var Sign = []byte("zhuogoon")

var Ctx = context.Background()
