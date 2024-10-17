package checkProject

import (
	"github.com/gin-gonic/gin"
	"health_backend/global"
	"health_backend/models"
	"health_backend/models/response"
	"net/http"
)

func GetAllCheckProjects(c *gin.Context) {
	var checkProjects []models.CheckProject
	var resp response.BaseResponse
	err := global.DB.Find(&checkProjects).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	resp.Code = 200
	resp.Msg = "Query successful"
	resp.Data = checkProjects
	c.JSON(http.StatusOK, resp)
}
