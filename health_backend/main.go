package main

import (
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"health_backend/core"
	"health_backend/middleware"
	"health_backend/router"
)

func main() {

	// 读取配置文件
	core.InitConfig()

	// 初始化数据库
	core.InitDatabase()

	// 初始化redis连接
	core.InitRedis()

	// 初始化路哟
	r := gin.Default()

	//  解决跨域
	r.Use(middleware.Cors())

	// jwt权限认证
	//r.Use(middleware.JwtParse())

	// 路由抽取
	router.Router(r)

	err := r.Run()
	if err != nil {
		logrus.Error("项目启动失败")
		return
	}

	logrus.Error("项目启动成功")
}
