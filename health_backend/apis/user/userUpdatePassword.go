package user

import (
	"github.com/gin-gonic/gin"
	"health_backend/global"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

// UpdatePassword 更新密码
func UpdatePassword(c *gin.Context) {
	user := &request.UserUpdatePassword{}
	resp := &response.BaseResponse{}

	err := c.ShouldBindBodyWithJSON(user)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	err = db.UpdatePassword(user.Password)
	if err != nil {
		resp.Code = 450
		resp.Msg = "修改失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	// 将token 加入黑名单
	token := c.GetHeader("Authorization")
	if token != "" {
		global.RDB.Set(global.Ctx, token, "revoked", 0) // 将令牌加入黑名单，设置为永不过期
	}

	resp.Code = 450
	resp.Msg = "修改成功，请重新登录"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
