package appointment

import (
	"github.com/gin-gonic/gin"
	"health_backend/global"
	"health_backend/models"
	"health_backend/models/response"
	"net/http"
)

func CountAppointmentsIncludingDeleted(c *gin.Context) {
	userID := global.UserId
	var patientID uint
	var resp response.BaseResponse
	err := global.DB.Table("patients").Select("id").Where("user_id = ?", userID).Scan(&patientID).Error
	if err != nil {
		resp.Code = 450
		resp.Msg = "Query failed"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	var count int64
	err = global.DB.Model(&models.Appointment{}).Unscoped().Where("patient_id = ?", patientID).Count(&count).Error
	if err != nil {
		resp.Code = 450
		resp.Msg = "Query failed"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = http.StatusOK
	resp.Msg = "Query successful"
	resp.Data = count
	c.AbortWithStatusJSON(http.StatusOK, resp)
}
