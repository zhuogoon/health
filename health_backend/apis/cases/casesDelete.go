package cases

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

// CaseDelete Delete 3.删除病例
func CaseDelete(c *gin.Context) {
	id := &request.CaseDeleteTimeId{}
	resp := &response.BaseResponse{}
	err := c.ShouldBindBodyWithJSON(id)
	if err != nil {
		resp.Code = 450
		resp.Msg = "失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	err = db.CaseDelete(id.Id)
	if err != nil {
		resp.Code = 450
		resp.Msg = "失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	resp.Code = 450
	resp.Msg = "删除成功"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
