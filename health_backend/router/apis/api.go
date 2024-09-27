package apis

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func User(r *gin.RouterGroup) {

	r.POST("register", Register)
	r.POST("login", Login)

	r.GET("info", func(context *gin.Context) {
		context.String(http.StatusOK, "heoasd")
	})

}
