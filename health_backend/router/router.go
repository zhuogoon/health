package router

import (
	"github.com/gin-gonic/gin"
	"health_backend/router/apis"
)

func Router(r *gin.Engine) {
	user := r.Group("/api/user")

	apis.User(user)
}
