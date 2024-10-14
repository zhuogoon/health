package cases

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

func CaseIdList(c *gin.Context) {
	id := &request.CaseDeleteTimeId{}
	resp := &response.BaseResponse{}
	err := c.ShouldBindBodyWithJSON(id)
	if err != nil {
		resp.Code = 450
		resp.Msg = "失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	list, err := db.CaseIdList(id.Id)
	if err != nil {
		resp.Code = 450
		resp.Msg = "失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	resp.Code = http.StatusOK
	resp.Msg = "成功"
	resp.Data = list
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return

}
