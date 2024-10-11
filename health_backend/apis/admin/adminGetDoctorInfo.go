package admin

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/response"
	"net/http"
)

func GetDoctor(c *gin.Context) {
	resp := &response.BaseResponse{}

	d, err := db.DoctorInfo()
	if err != nil {
		resp.Code = 450
		resp.Msg = "获取失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = http.StatusOK
	resp.Msg = "获取成功"
	resp.Data = d
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
