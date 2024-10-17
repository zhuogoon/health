package apis

import (
	"github.com/gin-gonic/gin"
	"health_backend/apis/check"
)

func Check(r *gin.RouterGroup) {
	r.POST("add", check.AddCheck)
}
