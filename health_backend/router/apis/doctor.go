package apis

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

func Create(c *gin.Context) {
	doctor := &request.Doctor{}
	resp := &response.BaseResponse{}

	err := c.ShouldBindBodyWithJSON(doctor)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	err = db.CreateDoctor(doctor)
	if err != nil {
		resp.Code = 450
		resp.Msg = "创建失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	resp.Code = http.StatusOK
	resp.Msg = "创建成功"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}

func UpdateDoctorInfo(c *gin.Context) {
	req := &request.UpdateDoctor{}
	resp := &response.BaseResponse{}

	err := c.ShouldBindBodyWithJSON(req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	err = db.UpdateDoctorInfo(req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "修改错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	resp.Code = 200
	resp.Msg = "修改成功"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}

func DeleteDoctor(c *gin.Context) {
	resp := &response.BaseResponse{}
	err := db.DeleteDoctor()
	if err != nil {
		resp.Code = 450
		resp.Msg = "删除失败"
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

	resp.Code = 200
	resp.Msg = "删除成功"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
