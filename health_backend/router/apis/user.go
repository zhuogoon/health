package apis

import (
	"github.com/gin-gonic/gin"
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
	req := &request.UserLoginReq{}
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
