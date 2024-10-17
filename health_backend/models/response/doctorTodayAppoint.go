package response

type DoctorTodayAppoint struct {
	AppointID   int    `json:"appoint_id"`
	PatientID   int    `json:"patient_id"`
	TimeID      int    `json:"time_id"`
	PatientName string `json:"patient_name"`
	Date        string `json:"date"`
	Age         int    `json:"age"`
	Year        int    `json:"year"`
	Month       int    `json:"month"`
	Day         int    `json:"day"`
	Birthday    string `json:"birthday"`
}
