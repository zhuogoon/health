package user

import (
	"github.com/gin-gonic/gin"
	"health_backend/global"
	"health_backend/models/response"
	"net/http"
)

// Logout 退出登录
func Logout(c *gin.Context) {
	resp := &response.BaseResponse{}
	token := c.GetHeader("Authorization")
	if token == "" {
		resp.Code = 450
		resp.Msg = "你没登录"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	global.RDB.Set(global.Ctx, token, "revoked", 0) // 将令牌加入黑名单，设置为永不过期

	resp.Code = http.StatusOK
	resp.Msg = "退出成功"
	c.AbortWithStatusJSON(http.StatusOK, resp)
}
