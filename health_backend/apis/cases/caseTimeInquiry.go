package cases

import (
	"github.com/gin-gonic/gin"
	"health_backend/global"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
	"time"
)

func TimeInquiry(c *gin.Context) {
	params := &request.Params{}
	resp := &response.BaseResponse{}
	err := c.ShouldBindBodyWithJSON(params)
	if err != nil {
		resp.Code = 450
		resp.Msg = "失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	layout := "2006-01-02 15:04:05"
	t, err := time.Parse(layout, params.Time)
	if err != nil {
		resp.Code = 450
		resp.Msg = "失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	cases, err := db.TimeInquiry(global.DB, t)
	if err != nil {
		resp.Code = 450
		resp.Msg = "失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	resp.Code = 450
	resp.Msg = "查询成功"
	resp.Data = cases
	c.JSON(http.StatusOK, resp)
}
