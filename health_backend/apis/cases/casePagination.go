package cases

import (
	"github.com/gin-gonic/gin"
	"health_backend/global"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

func Pagination(c *gin.Context) {
	pagination := &request.PaginationParams{}
	resp := &response.BaseResponse{}
	err := c.ShouldBindBodyWithJSON(pagination)
	if err != nil {
		resp.Code = 450
		resp.Msg = "失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	cases, err := db.Pagination(global.DB, *pagination)
	if err != nil {
		resp.Code = 450
		resp.Msg = "失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	resp.Code = 200
	resp.Msg = "查询成功"
	resp.Data = cases
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
