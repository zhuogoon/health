package global

import (
	"context"
	"github.com/go-redis/redis/v8"
	"gorm.io/gorm"
	"health_backend/config"
)

var (
	Config *config.Config
	DB     *gorm.DB
	UserId uint
	RDB    *redis.Client
)
var Sign = []byte("zhuogoon")

var Ctx = context.Background()
