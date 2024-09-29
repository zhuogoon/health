package apis

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

// Create 创建医生
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

// UpdateDoctorInfo 更新医生信息
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

// DeleteDoctor 删除医生
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

// AddCheck 医生添加收费项
func AddCheck(c *gin.Context) {
	req := &request.AddCheck{}
	resp := &response.BaseResponse{}

	err := c.ShouldBindBodyWithJSON(req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	err = db.AddCheck(req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "添加失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = http.StatusOK
	resp.Msg = "添加成功"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
