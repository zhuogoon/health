package router

import (
	"github.com/gin-gonic/gin"
	"health_backend/apis/file"
	"health_backend/router/apis"
)

func Router(r *gin.Engine) {
	user := r.Group("/api/user")
	doctor := r.Group("/api/doctor")
	patient := r.Group("/api/patient")
	admin := r.Group("/api/admin")
	cases := r.Group("/api/cases")
	appointment := r.Group("/api/appointment")
	checkProject := r.Group("/api/checkProject")
	check := r.Group("/api/check")

	apis.User(user)
	apis.Doctor(doctor)
	apis.Patient(patient)
	apis.Admin(admin)
	apis.Appointment(appointment)
	apis.Cases(cases)
	apis.CheckProject(checkProject)
	apis.Check(check)

	r.GET("/api/file", file.GetFile)
}
