package router

import (
	"github.com/gin-gonic/gin"
	"health_backend/router/apis"
)

func Router(r *gin.Engine) {
	user := r.Group("/api/user")
	doctor := r.Group("/api/doctor")
	patient := r.Group("/api/patient")
	admin := r.Group("/api/admin")
	cases := r.Group("/api/cases")
	appointment := r.Group("/api/appointment")

	apis.User(user)
	apis.Doctor(doctor)
	apis.Patient(patient)
	apis.Admin(admin)
	apis.Appointment(appointment)
	apis.Cases(cases)

}
