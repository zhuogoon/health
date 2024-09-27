package router

import (
	"github.com/gin-gonic/gin"
	"health_backend/router/apis"
)

func Router(r *gin.Engine) {
	user := r.Group("/api/user")
	doctor := r.Group("/api/doctor")

	apis.User(user)
	apis.Doctor(doctor)
}
