package admin

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/response"
	"net/http"
)

func GetPatientInfo(c *gin.Context) {
	resp := &response.BaseResponse{}

	pList, err := db.PatientInfo()
	if err != nil {
		resp.Code = 450
		resp.Msg = "查询失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	var patients []response.GetPatientInfo
	for _, p := range pList {
		patient := response.GetPatientInfo{
			Id:      p.ID,
			Name:    p.Name,
			Height:  p.Height,
			Weight:  p.Weight,
			Sex:     p.GenderString(), // 使用 GenderString 方法获取性别
			Phone:   p.Phone,
			Address: p.Address,
		}
		patients = append(patients, patient)
	}

	resp.Code = http.StatusOK
	resp.Msg = "查询成功"
	resp.Data = patients // 修改这里，应该是 patients 而不是 patient
	c.AbortWithStatusJSON(http.StatusOK, resp)
}
