package doctor

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

func GetDoctorByQuery(c *gin.Context) {
	req := &request.DoctorQuery{}
	resp := &response.BaseResponse{}

	err := c.ShouldBindJSON(&req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	doctors, err := db.GetDoctorByQuery(req.DoctorName, req.DoctorType)
	if err != nil {
		resp.Code = 450
		resp.Msg = "查询失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = http.StatusOK
	resp.Msg = "查询成功"
	resp.Data = doctors
	c.AbortWithStatusJSON(http.StatusOK, resp)
}
