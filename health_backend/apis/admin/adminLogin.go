package admin

import (
	"github.com/gin-gonic/gin"
	"health_backend/middleware"
	"health_backend/models/request"
	"health_backend/models/response"
	"health_backend/utils"
	"net/http"
)

// Log 管理员登录
func Log(c *gin.Context) {
	req := &request.AdminLog{}
	resp := &response.BaseResponse{}

	err := c.ShouldBindBodyWithJSON(req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	if req.Username != "admin" {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	b := utils.VerifyKey(req.Key)
	if b == false {
		resp.Code = 450
		resp.Msg = "sad"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	jwt, err := middleware.Jwt(req.Username)
	if err != nil {
		resp.Code = 450
		resp.Msg = err.Error()
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = 200
	resp.Msg = "登录成功"
	resp.Data = jwt
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
