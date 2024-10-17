package patient

import (
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"health_backend/models/db"
	"health_backend/models/response"
	"net/http"
	"strconv"
)

func FinshCheck(c *gin.Context) {
	resp := &response.BaseResponse{}
	id := c.Query("id")
	logrus.Info(id)
	idd, err := strconv.Atoi(id)
	err = db.FinshStatus(uint(idd))
	if err != nil {
		resp.Code = 450
		resp.Msg = "fail"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	resp.Code = http.StatusOK
	resp.Msg = "success"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
