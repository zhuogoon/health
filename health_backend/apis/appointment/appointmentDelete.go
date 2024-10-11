package appointment

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

func Delete(c *gin.Context) {
	id := &request.DeleteTimeId{}
	resp := response.BaseResponse{}
	err := c.ShouldBindBodyWithJSON(id)
	if err != nil {
		return
	}
	err = db.Delete(id.Id)
	if err != nil {
		resp.Code = 450
		resp.Msg = "失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	resp.Code = 200
	resp.Msg = "删除成功"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
