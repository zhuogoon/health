package apis

import (
	"github.com/gin-gonic/gin"
	"health_backend/apis/checkProject"
)

func CheckProject(r *gin.RouterGroup) {
	r.GET("list", checkProject.GetAllCheckProjects)
}
