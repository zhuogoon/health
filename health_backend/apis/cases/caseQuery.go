package cases

import (
	"github.com/gin-gonic/gin"
	"health_backend/global"
	"health_backend/models"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

func QueryCases(c *gin.Context) {
	UserID := global.UserId
	var caseQuery request.CaseQuery
	if err := c.ShouldBindJSON(&caseQuery); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var patientID uint
	if err := global.DB.Table("patients").Select("id").Where("user_id = ?", UserID).Scan(&patientID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve patient ID"})
		return
	}

	var cases []models.Case
	query := global.DB.Table("cases").Where("patient_id = ?", patientID)

	if !caseQuery.From.IsZero() {
		query = query.Where("created_at >= ?", caseQuery.From)
	}
	if !caseQuery.To.IsZero() {
		query = query.Where("created_at <= ?", caseQuery.To)
	}
	if caseQuery.Title != "" {
		query = query.Where("title LIKE ?", "%"+caseQuery.Title+"%")
	}

	if err := query.Find(&cases).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, response.BaseResponse{
		Code: 200,
		Msg:  "Query successful",
		Data: cases,
	})
}
