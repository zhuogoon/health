package user

import (
	"github.com/gin-gonic/gin"
	"health_backend/global"
	"health_backend/models/db"
	"health_backend/models/response"
	"net/http"
)

// Cancel 注销用户
func Cancel(c *gin.Context) {
	resp := &response.BaseResponse{}
	err := db.CancelUser()
	if err != nil {
		resp.Code = 450
		resp.Msg = "注销失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	token := c.GetHeader("Authorization")
	if token == "" {
		resp.Code = 450
		resp.Msg = "你没登录"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	global.RDB.Set(global.Ctx, token, "revoked", 0)

	resp.Code = 450
	resp.Msg = "注销成功"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
