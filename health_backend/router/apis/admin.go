package apis

import (
	"github.com/gin-gonic/gin"
	"health_backend/apis/admin"
)

func Admin(r *gin.RouterGroup) {
	r.GET("getkey", admin.GetKey)
	r.POST("login", admin.Log)
	r.POST("add", admin.AddCheckProject)
	r.POST("update", admin.UpdateCheck)
	r.POST("delete", admin.DeleteCheck)
	r.GET("info", admin.GetCheckInfo)
	r.GET("count", admin.GetCount)
	r.GET("doctor", admin.GetDoctor)
	r.GET("patient", admin.GetPatientInfo)
}
