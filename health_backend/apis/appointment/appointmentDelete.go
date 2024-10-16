package appointment

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/response"
	"net/http"
	"strconv"
)

func Delete(c *gin.Context) {
	idStr := c.Query("id")
	resp := response.BaseResponse{}

	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		resp.Code = 450
		resp.Msg = "Invalid ID format"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	err = db.Delete(uint(id))
	if err != nil {
		resp.Code = 450
		resp.Msg = "Failed to delete"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = 200
	resp.Msg = "Delete successful"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
