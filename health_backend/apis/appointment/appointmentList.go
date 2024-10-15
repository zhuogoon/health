package appointment

import (
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"health_backend/models/db"
	"health_backend/models/response"
	"net/http"
)

// List 2.获取所有预约
func List(c *gin.Context) {
	result, err := db.List()
	logrus.Info(result)
	resp := response.BaseResponse{}
	if err != nil {
		resp.Code = 450
		resp.Msg = "失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	resp.Code = 200
	resp.Msg = "成功"
	resp.Data = result
	c.AbortWithStatusJSON(http.StatusOK, resp)

}
