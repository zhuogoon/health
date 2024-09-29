package patient

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/response"
	"net/http"
	"time"
)

// Info 获取患者信息
func Info(c *gin.Context) {
	resp := &response.BaseResponse{}

	patient, err := db.GetPatientInfo()
	if err != nil {
		resp.Code = 450
		resp.Msg = "获取失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	today := time.Now()
	age := today.Year() - patient.Birthday.Year()

	// 检查今天是否在生日之前，如果是则减去1岁
	if today.YearDay() < patient.Birthday.YearDay() {
		age--
	}

	user, err := db.GetInfoById()
	if err != nil {
		resp.Code = 450
		resp.Msg = "获取失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	pat := &response.PatientInfo{
		Id:             patient.ID,
		UserId:         patient.UserID,
		Name:           patient.Name,
		Height:         patient.Height,
		Weight:         patient.Weight,
		Sex:            patient.Sex,
		MedicalHistory: patient.MedicalHistory,
		Phone:          patient.Phone,
		Address:        patient.Address,
		Allergens:      patient.Allergens,
		Age:            age,
		Role:           user.Role,
		Avatar:         user.Avatar,
		Username:       user.Username,
	}
	resp.Code = 200
	resp.Msg = "获取成功"
	resp.Data = pat
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
