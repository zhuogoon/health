package request

type DoctorCase struct {
	Id          uint   `json:"id"`
	PatientName string `json:"patient_name"`
	Sex         string `json:"sex"`
	Age         int    `json:"age"`
	DoctorType  string `json:"doctor_type"`
	CheckIDs    string `json:"checkIDs"`
	Date        string `json:"date"`
	Title       string `json:"title"`
	Content     string `json:"content"`
}
