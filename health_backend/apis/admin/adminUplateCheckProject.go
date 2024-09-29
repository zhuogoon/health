package admin

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

// UpdateCheck 更新收费项
func UpdateCheck(c *gin.Context) {
	req := &request.UpdateCheckProject{}
	resp := &response.BaseResponse{}

	err := c.ShouldBindBodyWithJSON(req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	err = db.UpdateCheck(req.Id, req.Name, req.Room)
	if err != nil {
		resp.Code = 450
		resp.Msg = "更新失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = http.StatusOK
	resp.Msg = "更新成功"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
