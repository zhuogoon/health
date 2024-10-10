package appointment

import (
	"github.com/gin-gonic/gin"
	"health_backend/models"
	"health_backend/models/db"
	"health_backend/models/response"
	"log"
	"net/http"
)

func Increase(c *gin.Context) {
	req := &models.Appointment{}
	resp := &response.BaseResponse{}
	err := c.ShouldBindBodyWithJSON(req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "添加失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	log.Println(req)
	err = db.Increase(req.TimeID, req.PatientID, req.DoctorID)
	if err != nil {
		resp.Code = 450
		resp.Msg = "添加失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	resp.Code = 200
	resp.Msg = "OK"
	resp.Data = req
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return

}
