package apis

import (
	"github.com/gin-gonic/gin"
	"health_backend/apis/user"
)

func User(r *gin.RouterGroup) {
	r.POST("update", user.UpdatePassword)
	r.GET("logout", user.Logout)
	r.GET("cancel", user.Cancel)
	r.POST("upload", user.Upload)
	r.GET("avatar", user.Avatar)
	r.POST("reg", user.RegLog)
}
