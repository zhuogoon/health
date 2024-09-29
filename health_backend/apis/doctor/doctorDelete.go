package doctor

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/response"
	"net/http"
)

// DeleteDoctor 删除医生
func DeleteDoctor(c *gin.Context) {
	resp := &response.BaseResponse{}
	err := db.DeleteDoctor()
	if err != nil {
		resp.Code = 450
		resp.Msg = "删除失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	token := c.GetHeader("Authorization")
	if token == "" {
		resp.Code = 450
		resp.Msg = "你没登录"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = 200
	resp.Msg = "删除成功"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
