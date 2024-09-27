package apis

import "github.com/gin-gonic/gin"

func User(r *gin.RouterGroup) {

	r.POST("register", Register)

}
