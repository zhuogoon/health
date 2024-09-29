package admin

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/response"
	"net/http"
)

// GetCheckInfo 获取收费项信息
func GetCheckInfo(c *gin.Context) {
	resp := &response.BaseResponse{}

	ch, err := db.GetCheckProjects()
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	resp.Code = http.StatusOK
	resp.Msg = "获取成功"
	resp.Data = ch
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
