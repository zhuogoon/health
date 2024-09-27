package apis

import "github.com/gin-gonic/gin"

func User(r *gin.RouterGroup) {

	r.GET("hello", Hello)

}
