package cases

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

func CaseUpdate(c *gin.Context) {
	content := &request.ResponseCaseInfo{}
	resp := &response.BaseResponse{}
	err := c.ShouldBindBodyWithJSON(content)
	if err != nil {
		resp.Code = 450
		resp.Msg = "失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	err = db.CaseUpdate(content.Id, content.Content, content.Title, content.CheckID)
	if err != nil {
		resp.Code = 450
		resp.Msg = "失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	resp.Code = 200
	resp.Msg = "修改成功"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
