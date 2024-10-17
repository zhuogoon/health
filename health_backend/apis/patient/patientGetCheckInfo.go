package patient

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/response"
	"net/http"
)

func GetCheckInfo(c *gin.Context) {
	resp := &response.BaseResponse{}

	check, err := db.GetCheckInfoByPatientId()
	if err != nil {
		resp.Code = 450
		resp.Msg = "获取失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	resp.Code = http.StatusOK
	resp.Msg = "success"
	resp.Data = check
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
