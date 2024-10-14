package appointment

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

func Update(c *gin.Context) {
	timeid := &request.UpdateTimeId{}
	resp := response.BaseResponse{}
	err := c.ShouldBindBodyWithJSON(timeid)
	if err != nil {
		return
	}
	err = db.Update(timeid.Id, timeid.TimeId)
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
