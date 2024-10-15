package appointment

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

func QueryAppointments(c *gin.Context) {
	var req request.AppointQuery
	var resp response.BaseResponse

	if err := c.ShouldBindJSON(&req); err != nil {
		resp.Code = 450
		resp.Msg = "Invalid parameters"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	appointments, err := db.QueryAppointments(req.From, req.To)
	if err != nil {
		resp.Code = 450
		resp.Msg = "Query failed"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = http.StatusOK
	resp.Msg = "Query successful"
	resp.Data = appointments
	c.AbortWithStatusJSON(http.StatusOK, resp)
}
