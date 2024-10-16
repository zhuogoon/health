package response

type AppointmentCard struct {
	ID           int    `json:"id"`
	DoctorName   string `json:"doctor_name"`
	DoctorTitle  string `json:"doctor_title"`
	DoctorType   string `json:"doctor_type"`
	DoctorAvatar string `json:"doctor_avatar"`
	Date         string `json:"date"`
	Status       bool   `json:"status"`
	Year         int    `json:"year"`
	Month        int    `json:"month"`
	Day          int    `json:"day"`
	TimeID       int    `json:"time_id"`
}
