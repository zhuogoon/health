package appointment

import (
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"health_backend/models/db"
	"health_backend/models/response"
	"net/http"
)

// NonFinishedList retrieves non-finished appointments for a given user ID
func NonFinishedList(c *gin.Context) {
	patientID, err := db.GetPatientIdByUserId()
	if err != nil {
		logrus.Error(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve patient ID"})
		return
	}

	result, err := db.List(patientID)
	if err != nil {
		logrus.Error(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve appointments"})
		return
	}

	var nonFinishedAppointments []response.AppointmentCard
	for _, appointment := range result {
		if !appointment.Status {
			nonFinishedAppointments = append(nonFinishedAppointments, appointment)
		}
	}

	resp := response.BaseResponse{
		Code: 200,
		Msg:  "Query successful",
		Data: nonFinishedAppointments,
	}
	c.JSON(http.StatusOK, resp)
}
