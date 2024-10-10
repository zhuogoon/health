package cases

import (
	"github.com/gin-gonic/gin"
	"health_backend/models"
	"health_backend/models/db"
	"health_backend/models/response"
	"log"
	"net/http"
)

// CaseIncrease 1.创建病例

func CaseIncrease(c *gin.Context) {
	req := &models.Case{}
	resp := &response.BaseResponse{}
	err := c.ShouldBindBodyWithJSON(req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	log.Println(req)
	err = db.CaseIncrease(req.PatientID, req.DoctorID, req.Title, req.Content)
	if err != nil {
		resp.Code = 450
		resp.Msg = "失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	resp.Code = 200
	resp.Msg = "成功"
	resp.Data = req
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return

}
