package appointment

import (
	"github.com/gin-gonic/gin"
	"health_backend/global"
	"health_backend/models"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"health_backend/utils"
	"net/http"
	"strconv"
	"strings"
	"time"
)

// Increase 添加新预约
func Increase(c *gin.Context) {
	req := &request.Increase{}
	resp := &response.BaseResponse{}

	err := c.ShouldBindJSON(req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	// 获取分布式锁
	lockKey := "appointment_lock" + strconv.Itoa(int(req.DoctorId))
	locked, err := utils.ObtainLock(lockKey, 10*time.Second)
	if err != nil || !locked {
		resp.Code = 450
		resp.Msg = "资源争抢失败，请稍后再试"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	defer func(key string) {
		err := utils.ReleaseLock(key)
		if err != nil {

		}
	}(lockKey)

	data := strings.Split(req.Time, "-")
	year := data[0]
	month := data[1]
	day := data[2]
	id, err := db.GetPatientIdByUserId()
	if err != nil {
		resp.Code = 450
		resp.Msg = "没有患者信息"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	appointment := &models.Appointment{
		DoctorID:  req.DoctorId,
		PatientID: id,
		TimeID:    req.TimeId,
		Year:      year,
		Month:     month,
		Day:       day,
	}

	err = db.Increase(appointment)
	if err != nil {
		resp.Code = 450
		resp.Msg = "添加失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	// 创建一个新的病例记录，初始状态为0
	caseRecord := &models.Case{
		DoctorID:  req.DoctorId,
		PatientID: id,
		Status:    false,
	}

	err = CreateCase(caseRecord)
	if err != nil {
		resp.Code = 450
		resp.Msg = "病例记录添加失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = http.StatusOK
	resp.Msg = "success"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}

func CreateCase(caseRecord *models.Case) error {
	return global.DB.Create(caseRecord).Error
}
