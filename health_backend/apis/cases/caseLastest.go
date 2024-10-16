package cases

import (
	"github.com/gin-gonic/gin"
	"health_backend/global"
	"health_backend/models/db"
	"health_backend/models/response"
	"net/http"
)

func GetLatestCaseByUserID(c *gin.Context) {
	userID := global.UserId
	resp := response.BaseResponse{}

	latestCase, err := db.GetLatestCaseByUserID(userID)
	if err != nil {
		resp.Code = 450
		resp.Msg = "Query failed"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = 200
	resp.Msg = "Query successful"
	resp.Data = latestCase
	c.AbortWithStatusJSON(http.StatusOK, resp)
}
