package doctor

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
