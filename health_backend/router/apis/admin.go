package apis

import (
	"github.com/gin-gonic/gin"
	"health_backend/middleware"
	"health_backend/models/request"
	"health_backend/models/response"
	"health_backend/utils"
	"net/http"
)

func AdminGetKey(c *gin.Context) {
	resp := &response.BaseResponse{}

	key, err := utils.GenerateRandomKey()
	if err != nil {
		resp.Code = 450
		resp.Msg = "获取登录码错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = 200
	resp.Msg = "获取登录码成功"
	resp.Data = key
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}

func AdminLog(c *gin.Context) {
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
		resp.Msg = "登录码错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	jwt, err := middleware.Jwt(req.Username)
	if err != nil {
		resp.Code = 450
		resp.Msg = "登录码错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = 200
	resp.Msg = "登录成功"
	resp.Data = jwt
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
