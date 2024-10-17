package check

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"health_backend/global"
	"health_backend/models"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

func AddCheck(c *gin.Context) {
	var createCheck request.CreateCheck
	if err := c.ShouldBindJSON(&createCheck); err != nil {
		c.JSON(http.StatusBadRequest, response.BaseResponse{
			Code: http.StatusBadRequest,
			Msg:  err.Error(),
			Data: nil,
		})
		return
	}

	check := models.Check{
		DoctorId:       uint(createCheck.DoctorID),
		PatientId:      uint(createCheck.PatientID),
		CheckProjectId: uint(createCheck.CheckProjectID),
		Status:         models.StatusUnchecked,
	}

	if err := global.DB.Create(&check).Error; err != nil {
		c.JSON(http.StatusInternalServerError, response.BaseResponse{
			Code: http.StatusInternalServerError,
			Msg:  err.Error(),
			Data: nil,
		})
		return
	}

	var caseInfo models.Case
	if err := global.DB.Table("cases").Where("id = ?", createCheck.CaseID).First(&caseInfo).Error; err != nil {
		c.JSON(http.StatusInternalServerError, response.BaseResponse{
			Code: http.StatusInternalServerError,
			Msg:  err.Error(),
			Data: nil,
		})
		return
	}

	if caseInfo.CheckID == "" {
		caseInfo.CheckID = fmt.Sprintf("%d", check.ID)
	} else {
		caseInfo.CheckID = fmt.Sprintf("%s,%d", caseInfo.CheckID, check.ID)
	}

	if err := global.DB.Save(&caseInfo).Error; err != nil {
		c.JSON(http.StatusInternalServerError, response.BaseResponse{
			Code: http.StatusInternalServerError,
			Msg:  err.Error(),
			Data: nil,
		})
		return
	}

	c.JSON(http.StatusOK, response.BaseResponse{
		Code: http.StatusOK,
		Msg:  "Check added successfully",
		Data: check,
	})
}
