package apis

import (
	"github.com/gin-gonic/gin"
	"health_backend/global"
	"health_backend/middleware"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

// Register 用户注册
func Register(c *gin.Context) {
	req := &request.UserRegisterReq{}
	resp := &response.BaseResponse{}
	err := c.ShouldBindBodyWithJSON(req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	err = db.Register(req.Username, req.Password)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = 200
	resp.Msg = "注册成功"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}

func Login(c *gin.Context) {
	req := &request.UserRegisterReq{}
	resp := &response.BaseResponse{}

	err := c.ShouldBindBodyWithJSON(req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	b, err := db.IsUsername(req.Username)
	if b == false {
		if err == nil {
			resp.Code = 450
			resp.Msg = "用户未注册"
			c.AbortWithStatusJSON(http.StatusOK, resp)
			return
		}
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	err = db.IsPassword(req.Username, req.Password)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	jwt, err := middleware.Jwt(req.Username)
	if err != nil {
		resp.Code = 450
		resp.Msg = "构造token失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	c.Header("jwt", jwt)

	resp.Code = 200
	resp.Msg = "登录成功"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return

}

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
