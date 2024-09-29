package doctor

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

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
