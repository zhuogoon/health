package admin

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/response"
	"net/http"
)

// GetCount 获取数量
func GetCount(c *gin.Context) {
	resp := &response.BaseResponse{}

	count, err := db.GetCount()
	if err != nil {
		resp.Code = 450
		resp.Msg = "获取失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	resp.Code = http.StatusOK
	resp.Msg = "获取成功"
	resp.Data = count
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
