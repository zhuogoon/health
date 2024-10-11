package doctor

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

func GetByJobType(c *gin.Context) {
	req := &request.GetByJobType{}
	resp := &response.BaseResponse{}

	err := c.ShouldBindBodyWithJSON(&req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	jobType, err := db.GetDoctorByJobType(req.JobType)
	if err != nil {
		resp.Code = 450
		resp.Msg = "无"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	resp.Code = http.StatusOK
	resp.Msg = "查询成功"
	resp.Data = jobType
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
