package cases

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/response"
	"net/http"
)

func CaseIdList(c *gin.Context) {
	id := c.Query("id")
	resp := &response.BaseResponse{}
	list, err := db.CaseById(id)
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
