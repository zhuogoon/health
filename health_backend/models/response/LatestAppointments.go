package response

type LastAppointment struct {
	DoctorName string `json:"doctor_name"`
	DoctorType string `json:"doctor_type"`
	Date       string `json:"date"`
	DoctorImg  string `json:"doctor_img"`
	UpdateTime string `json:"update_time"`
	Year       int    `json:"year"`
	Month      int    `json:"month"`
	Day        int    `json:"day"`
	TimeID     int    `json:"time_id"`
}
