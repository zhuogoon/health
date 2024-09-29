package patient

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

// CreatePatient 创建患者
func CreatePatient(c *gin.Context) {
	req := &request.CreatePatient{}
	resp := &response.BaseResponse{}

	err := c.ShouldBindBodyWithJSON(req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	err = db.CreatePatient(req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "创建失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	err = db.UpdateUserStatus()
	if err != nil {
		resp.Code = 450
		resp.Msg = "修改失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = 200
	resp.Msg = "创建成功"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
