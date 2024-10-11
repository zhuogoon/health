package doctor

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

func GetDoctorByName(c *gin.Context) {
	req := &request.GetByName{}
	resp := &response.BaseResponse{}

	err := c.ShouldBindBodyWithJSON(&req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	d, err := db.GetDoctorByName(req.Name)
	if err != nil {
		resp.Code = 450
		resp.Msg = "无"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = http.StatusOK
	resp.Msg = "获取成功"
	resp.Data = d
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
