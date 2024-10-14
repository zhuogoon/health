package apis

import (
	"github.com/gin-gonic/gin"
	"health_backend/apis/patient"
)

func Patient(r *gin.RouterGroup) {
	r.POST("create", patient.CreatePatient)
	r.GET("info", patient.Info)
	r.POST("update", patient.UpdatePatientInfo)
	r.POST("infobyid", patient.GetInfoById)
}
