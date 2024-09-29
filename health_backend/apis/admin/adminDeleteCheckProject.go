package admin

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

// DeleteCheck 删除收费项
func DeleteCheck(c *gin.Context) {
	req := &request.DeleteCheck{}
	resp := &response.BaseResponse{}

	err := c.ShouldBindBodyWithJSON(req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	err = db.DeleteCheck(req.Id)
	if err != nil {
		resp.Code = 450
		resp.Msg = "删除失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = http.StatusOK
	resp.Msg = "删除成功"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
