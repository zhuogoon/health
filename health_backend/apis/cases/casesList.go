package cases

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/response"
	"net/http"
)

// CaseList 2.获取病例
func CaseList(c *gin.Context) {
	result, err := db.CaseList()
	resp := &response.BaseResponse{}
	if err != nil {
		resp.Code = 450
		resp.Msg = "失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	resp.Code = 200
	resp.Msg = "成功"
	resp.Data = result
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
