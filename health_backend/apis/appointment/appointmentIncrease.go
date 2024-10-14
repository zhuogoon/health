package appointment

import (
	"github.com/gin-gonic/gin"
	"health_backend/global"
	"health_backend/models"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
	"strings"
)

// Increase 添加新预约
func Increase(c *gin.Context) {
	req := &request.Increase{}
	resp := &response.BaseResponse{}

	err := c.ShouldBindBodyWithJSON(req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	data := strings.Split(req.Time, "-")
	year := data[0]
	month := data[1]
	day := data[2]
	appointment := &models.Appointment{
		DoctorID:  req.DoctorId,
		PatientID: global.UserId,
		TimeID:    req.TimeId,
		Year:      year,
		Month:     month,
		Day:       day,
	}

	err = db.Increase(appointment)
	if err != nil {
		resp.Code = 450
		resp.Msg = "添加失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	resp.Code = http.StatusOK
	resp.Msg = "success"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return

}
