package admin

import (
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"health_backend/models/response"
	"health_backend/utils"
	"net/http"
)

// GetKey AdminGetKey 获取管理员登录密钥
func GetKey(c *gin.Context) {
	resp := &response.BaseResponse{}

	key, err := utils.GenerateRandomKey()
	if err != nil {
		resp.Code = 450
		resp.Msg = err.Error()
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	logrus.Info(key)
	resp.Code = 200
	resp.Msg = "获取登录码成功"
	resp.Data = key
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
