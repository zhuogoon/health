package appointment

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

func GetInfoByID(c *gin.Context) {
	req := &request.GetInfoById{}
	resp := &response.BaseResponse{}

	err := c.ShouldBindBodyWithJSON(&req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	id, err := db.GetAppointmentInfoById(req.Id)
	if err != nil {
		resp.Code = 450
		resp.Msg = "无"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = http.StatusOK
	resp.Msg = "success"
	resp.Data = id
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
