package apis

import (
	"github.com/gin-gonic/gin"
)

func User(r *gin.RouterGroup) {

	r.POST("register", Register)
	r.POST("login", Login)
	r.POST("update", UpdatePassword)
	r.GET("logout", Logout)
	r.GET("cancel", Cancel)

}
