package cases

import (
	"github.com/gin-gonic/gin"
	"health_backend/global"
	"health_backend/models"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
	"strings"
	"time"
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

	var patient models.Patient
	err = global.DB.Table("patients").Where("id = ?", caseQuery.PatientID).First(&patient).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	checkID := caseQuery.CheckID
	if checkID == "" {
		caseInfo := request.ResponseCaseInfo{
			Id:           caseQuery.Id,
			Title:        caseQuery.Title,
			Content:      caseQuery.Content,
			DoctorName:   doctor.Name,
			DoctorID:     doctor.ID,
			CheckProject: []request.CheckInfo{},
			CheckID:      caseQuery.CheckID,
			PatientName:  patient.Name,
			PatientID:    patient.ID,
			Sex:          patient.Sex,
			Age:          calculateAge(patient.Birthday),
			DoctorType:   doctor.JobType,
			Date:         caseQuery.CreatedAt.Format("2006-01-02 15:04:05"),
		}

		c.JSON(http.StatusOK, response.BaseResponse{
			Code: 200,
			Msg:  "Query successful",
			Data: caseInfo,
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
		DoctorID:     doctor.ID,
		CheckProject: checkInfos,
		CheckID:      caseQuery.CheckID,
		PatientName:  patient.Name,
		PatientID:    patient.ID,
		Sex:          patient.Sex,
		Age:          calculateAge(patient.Birthday),
		DoctorType:   doctor.JobType,
		Date:         caseQuery.CreatedAt.Format("2006-01-02 15:04:05"),
	}

	c.JSON(http.StatusOK, response.BaseResponse{
		Code: 200,
		Msg:  "Query successful",
		Data: caseInfo,
	})
}

func calculateAge(birthday *time.Time) int {
	if birthday == nil {
		return 0
	}
	today := time.Now()
	age := today.Year() - birthday.Year()
	if today.YearDay() < birthday.YearDay() {
		age--
	}
	return age
}
