package appointment

import (
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"health_backend/global"
	"health_backend/models"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
	"strings"
)

func GetAppointmentsByDoctorID(c *gin.Context) {
	prop := &request.ChooseProp{}
	resp := &response.BaseResponse{}
	err := c.ShouldBindBodyWithJSON(prop)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	logrus.Info(prop)
	if prop.DoctorId == "" || prop.Date == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "doctor_id and date are required"})
		return
	}

	dateParts := strings.Split(prop.Date, "-")
	if len(dateParts) != 3 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "date format should be YYYY-MM-DD"})
		return
	}
	year, month, day := dateParts[0], dateParts[1], dateParts[2]

	var appointments []models.Appointment
	err = global.DB.Table("appointments").Where("doctor_id = ? AND year = ? AND month = ? AND day = ?", prop.DoctorId, year, month, day).Find(&appointments).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	logrus.Info(appointments)
	timeStatus := make(map[int]uint)
	for _, appointment := range appointments {
		timeStatus[appointment.TimeID] = 1
	}

	var appointmentChoices []response.AppointmentChoose
	for i := 1; i <= 8; i++ {
		status, exists := timeStatus[i]
		if !exists {
			status = 0
		}
		appointmentChoices = append(appointmentChoices, response.AppointmentChoose{
			Val:    uint(i),
			Status: status,
		})
	}

	resp.Code = http.StatusOK
	resp.Msg = "Query successful"
	resp.Data = appointmentChoices
	c.AbortWithStatusJSON(http.StatusOK, resp)
}
