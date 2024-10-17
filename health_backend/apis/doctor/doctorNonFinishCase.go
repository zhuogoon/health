package doctor

import (
	"github.com/gin-gonic/gin"
	"health_backend/global"
	"health_backend/models/response"
	"net/http"
)

func GetNonFinishCases(c *gin.Context) {
	var cases []response.NonFinishCase
	resp := &response.BaseResponse{}
	var doctorID uint

	// Retrieve DoctorID based on UserID
	err := global.DB.Table("doctors").Select("id").Where("user_id = ?", global.UserId).Scan(&doctorID).Error
	if err != nil {
		resp.Code = http.StatusInternalServerError
		resp.Msg = "Failed to retrieve doctor ID"
		c.JSON(http.StatusInternalServerError, resp)
		return
	}

	// Fetch non-finished cases managed by the doctor
	err = global.DB.Table("cases").
		Select("cases.id, patients.name as patient_name, birthday, cases.updated_at, sex").
		Where("doctor_id = ? AND status = ?", doctorID, false).
		Joins("left join patients on patients.id = cases.patient_id").
		Scan(&cases).Error
	if err != nil {
		resp.Code = http.StatusInternalServerError
		resp.Msg = "Failed to retrieve cases"
		c.JSON(http.StatusInternalServerError, resp)
		return
	}

	// Calculate age and construct date
	for i := range cases {
		cases[i].Age = calculateAge(cases[i].Birthday)
	}

	resp.Code = http.StatusOK
	resp.Msg = "Success"
	resp.Data = cases
	c.JSON(http.StatusOK, resp)
}
