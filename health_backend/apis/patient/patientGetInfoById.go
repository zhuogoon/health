package patient

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/response"
	"net/http"
)

func GetInfoById(c *gin.Context) {
	pid := c.Query("pid")
	resp := &response.BaseResponse{}

	id, err := db.GetPatientInfoById(pid)
	if err != nil {
		resp.Code = 450
		resp.Msg = "无"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = http.StatusOK
	resp.Msg = "success"
	resp.Data = id
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
