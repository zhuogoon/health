package cases

import (
	"github.com/gin-gonic/gin"
	"health_backend/global"
	"health_backend/models"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
	"strings"
)

func GetCaseDetails(c *gin.Context) {
	caseID := c.Query("case_id")
	if caseID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "case_id is required"})
		return
	}

	var caseQuery request.CaseInfoQuery
	err := global.DB.Table("cases").Where("id = ?", caseID).First(&caseQuery).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var doctor models.Doctor
	err = global.DB.Table("doctors").Where("id = ?", caseQuery.DoctorID).First(&doctor).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	checkID := caseQuery.CheckID
	if checkID == "" {
		c.JSON(http.StatusOK, response.BaseResponse{
			Code: 200,
			Msg:  "Query successful",
			Data: caseQuery,
		})
		return
	}

	checkIDs := strings.Split(checkID, ",")
	var checks []models.Check
	err = global.DB.Table("checks").Where("id IN ?", checkIDs).Find(&checks).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var checkProjectIDs []uint
	for _, check := range checks {
		checkProjectIDs = append(checkProjectIDs, check.CheckProjectId)
	}

	var checkProjects []models.CheckProject
	err = global.DB.Table("check_projects").Where("id IN ?", checkProjectIDs).Find(&checkProjects).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var checkInfos []request.CheckInfo
	for _, check := range checks {
		for _, project := range checkProjects {
			if check.CheckProjectId == project.ID {
				checkInfos = append(checkInfos, request.CheckInfo{
					Name:   project.Name,
					Room:   project.Room,
					Img:    project.Img,
					Status: string(check.Status),
					Time:   check.CreatedAt.Format("2006-01-02 15:04:05"),
				})
			}
		}
	}

	caseInfo := request.ResponseCaseInfo{
		Id:           caseQuery.Id,
		Title:        caseQuery.Title,
		Content:      caseQuery.Content,
		DoctorName:   doctor.Name,
		CheckID:      caseQuery.CheckID,
		CheckProject: checkInfos,
	}

	c.JSON(http.StatusOK, response.BaseResponse{
		Code: 200,
		Msg:  "Query successful",
		Data: caseInfo,
	})
}
