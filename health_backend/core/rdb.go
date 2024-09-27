package core

import (
	"github.com/go-redis/redis/v8"
	"github.com/sirupsen/logrus"
	"health_backend/global"
)

func InitRedis() {
	addr := global.Config.Redis.GetAddr()
	pwd := global.Config.Redis.GetPwd()

	global.RDB = redis.NewClient(&redis.Options{
		Addr:     addr,
		Password: pwd,
	})

	if err := global.RDB.Ping(global.Ctx).Err(); err != nil {
		logrus.Error("redis连接失败")
		return
	}
	logrus.Info("redis 连接成功")
}
