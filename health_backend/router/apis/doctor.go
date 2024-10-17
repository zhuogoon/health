package apis

import (
	"github.com/gin-gonic/gin"
	"health_backend/apis/doctor"
)

func Doctor(r *gin.RouterGroup) {

	r.POST("create", doctor.Create)
	r.POST("update", doctor.UpdateDoctorInfo)
	r.POST("add", doctor.AddCheck)
	r.GET("jobtype", doctor.GetDoctorJobType)
	r.POST("query", doctor.GetDoctorByQuery)
	r.GET("/todayappoint", doctor.GetAppointmentsByDoctorUserID)
	r.GET("nonfinishcases", doctor.GetNonFinishCases)
}
