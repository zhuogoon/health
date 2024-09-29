package apis

import (
	"github.com/gin-gonic/gin"
	"health_backend/apis/doctor"
)

func Doctor(r *gin.RouterGroup) {

	r.POST("create", doctor.Create)
	r.POST("update", doctor.UpdateDoctorInfo)
	r.GET("delete", doctor.DeleteDoctor)
	r.POST("add", doctor.AddCheck)
}
