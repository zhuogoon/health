package doctor

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

// AddCheck 医生添加收费项
func AddCheck(c *gin.Context) {
	req := &request.AddCheck{}
	resp := &response.BaseResponse{}

	err := c.ShouldBindBodyWithJSON(req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	err = db.AddCheck(req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "添加失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = http.StatusOK
	resp.Msg = "添加成功"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
