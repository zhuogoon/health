package user

import (
	"github.com/gin-gonic/gin"
	"health_backend/middleware"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

// RegLog 判断注册登录，没注册直接注册，注册了直接登录
func RegLog(c *gin.Context) {
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

		id, err := db.GetIdByUsername(req.Username)
		if err != nil {
			resp.Code = 450
			resp.Msg = "未注册"
			c.AbortWithStatusJSON(http.StatusOK, resp)
			return
		}

		status, err := db.GetStatus(id)
		if err != nil {
			resp.Code = 450
			resp.Msg = "未注册"
			c.AbortWithStatusJSON(http.StatusOK, resp)
			return
		}

		userresp := response.User{
			Id:       id,
			Username: req.Username,
			Jwt:      jwt,
			Status:   status,
		}

		resp.Code = 200
		resp.Msg = "注册并且登录成功"
		resp.Data = userresp
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

	id, err := db.GetIdByUsername(req.Username)
	if err != nil {
		resp.Code = 450
		resp.Msg = "未注册"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	status, err := db.GetStatus(id)
	if err != nil {
		resp.Code = 450
		resp.Msg = "未注册"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	userresp := response.User{
		Id:       id,
		Username: req.Username,
		Jwt:      jwt,
		Status:   status,
	}

	resp.Code = 200
	resp.Msg = "登录成功"
	resp.Data = userresp
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return

}
