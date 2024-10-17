package checkProject

import (
	"github.com/gin-gonic/gin"
	"health_backend/global"
	"health_backend/models"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
)

func CreateCheckProject(c *gin.Context) {
	var createCheckProject request.CreateCheckProject
	if err := c.ShouldBindJSON(&createCheckProject); err != nil {
		c.JSON(http.StatusBadRequest, response.BaseResponse{
			Code: http.StatusBadRequest,
			Msg:  err.Error(),
			Data: nil,
		})
		return
	}

	checkProject := models.CheckProject{
		Name: createCheckProject.Name,
		Room: createCheckProject.Room,
	}

	if err := global.DB.Create(&checkProject).Error; err != nil {
		c.JSON(http.StatusInternalServerError, response.BaseResponse{
			Code: http.StatusInternalServerError,
			Msg:  err.Error(),
			Data: nil,
		})
		return
	}

	c.JSON(http.StatusOK, response.BaseResponse{
		Code: http.StatusOK,
		Msg:  "Check project created successfully",
		Data: checkProject,
	})
}
