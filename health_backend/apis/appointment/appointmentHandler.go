package appointment

import (
	"github.com/gin-gonic/gin"
	"health_backend/global"
	"health_backend/models/db"
	"health_backend/models/response"
	"net/http"
)

func GetLatestAppointmentByPatientID(c *gin.Context) {
	uid := global.UserId
	var resp response.BaseResponse

	appointment, err := db.GetLatestAppointmentByPatientID(uid)
	if err != nil {
		resp.Code = 450
		resp.Msg = "Query failed"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = http.StatusOK
	resp.Msg = "Query successful"
	resp.Data = appointment
	c.AbortWithStatusJSON(http.StatusOK, resp)
}
