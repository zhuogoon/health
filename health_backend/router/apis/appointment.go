package apis

import (
	"github.com/gin-gonic/gin"
	"health_backend/apis/appointment"
)

func Appointment(r *gin.RouterGroup) {
	r.POST("increase", appointment.Increase)
	r.GET("list", appointment.List)
	r.GET("delete", appointment.Delete)
	r.POST("update", appointment.Update)
	r.POST("getinfobyid", appointment.GetInfoByID)
	r.POST("query", appointment.QueryAppointments)
	r.GET("latest", appointment.GetLatestAppointmentByPatientID)
	r.POST("choose", appointment.GetAppointmentsByDoctorID)
	r.GET("nonfinished", appointment.NonFinishedList)
	r.GET("sum", appointment.CountAppointmentsIncludingDeleted)
}
