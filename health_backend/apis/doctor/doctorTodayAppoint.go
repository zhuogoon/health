package doctor

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"health_backend/global"
	"health_backend/models/response"
	"net/http"
	"strings"
	"time"
)

func GetAppointmentsByDoctorUserID(c *gin.Context) {
	userID := global.UserId
	resp := &response.BaseResponse{}
	var doctorID uint

	err := global.DB.Table("doctors").Select("id").Where("user_id = ?", userID).Scan(&doctorID).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve doctor ID"})
		return
	}

	var appointments []response.DoctorTodayAppoint

	err = global.DB.Table("appointments").
		Select(`appointments.id as appoint_id, appointments.patient_id, appointments.time_id, patients.name as patient_name, patients.birthday, appointments.year, appointments.month, appointments.day`).
		Joins("left join patients on patients.id = appointments.patient_id").
		Where("appointments.doctor_id = ?", doctorID).
		Order("appointments.year, appointments.month, appointments.day, appointments.time_id").
		Scan(&appointments).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Get the current date
	currentDate := time.Now().Format("2006-01-02")
	var todayAppointments []response.DoctorTodayAppoint

	// Calculate the age, construct the Date attribute, and filter by current date
	for i := range appointments {
		appointments[i].Age = calculateAge(appointments[i].Birthday)
		appointments[i].Date = constructDate(appointments[i].Year, appointments[i].Month, appointments[i].Day, appointments[i].TimeID)

		// Extract the date part from appointments[i].Date
		appointmentDate := strings.Split(appointments[i].Date, " ")[0]
		if appointmentDate == currentDate {
			todayAppointments = append(todayAppointments, appointments[i])
		}
	}

	resp.Code = http.StatusOK
	resp.Msg = "查询成功"
	resp.Data = todayAppointments
	c.JSON(http.StatusOK, resp)
}

// calculateAge calculates the age based on the birthday
func calculateAge(birthday string) int {
	birthDate, err := time.Parse(time.RFC3339, birthday)
	if err != nil {
		return 0
	}
	today := time.Now()
	age := today.Year() - birthDate.Year()
	if today.YearDay() < birthDate.YearDay() {
		age--
	}
	return age
}

func constructDate(year int, month int, day int, timeID int) string {
	timeMap := map[int]string{
		1: "08:00-09:00",
		2: "09:00-10:00",
		3: "10:00-11:00",
		4: "11:00-12:00",
		5: "14:00-15:00",
		6: "15:00-16:00",
		7: "16:00-17:00",
		// Add more mappings as needed
	}

	timeRange, exists := timeMap[timeID]
	if !exists {
		timeRange = "Unknown"
	}

	return fmt.Sprintf("%04d-%02d-%02d %s", year, month, day, timeRange)
}
