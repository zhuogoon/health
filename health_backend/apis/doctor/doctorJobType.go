package doctor

import (
	"github.com/gin-gonic/gin"
	"health_backend/models/db"
	"health_backend/models/response"
	"net/http"
)

func GetDoctorJobType(c *gin.Context) {
	resp := &response.BaseResponse{}

	jobType, err := db.GetDoctorJobType()
	if err != nil {
		resp.Code = 450
		resp.Msg = "查询失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	// 使用 map 进行去重
	jobMap := make(map[string]struct{})
	for _, j := range jobType {
		jobMap[j] = struct{}{}
	}

	// 将去重后的结果转换回切片
	uniqueJobs := make([]string, 0, len(jobMap))
	for j := range jobMap {
		uniqueJobs = append(uniqueJobs, j)
	}

	resp.Code = http.StatusOK
	resp.Msg = "查询成功"
	resp.Data = uniqueJobs
	c.AbortWithStatusJSON(http.StatusOK, jobType)

}
