package request

type CaseInfoQuery struct {
	Id         uint   `json:"id"`
	Title      string `json:"title"`
	Content    string `json:"content"`
	DoctorName string `json:"doctor_name"`
	CheckID    string `json:"check_id"`
	DoctorID   uint   `json:"doctor_id"`
}
