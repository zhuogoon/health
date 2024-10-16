package request

type ResponseCaseInfo struct {
	Id           uint        `json:"id"`
	Title        string      `json:"title"`
	Content      string      `json:"content"`
	DoctorName   string      `json:"doctor_name"`
	CheckProject []CheckInfo `json:"check_project"`
	CheckID      string      `json:"check_id"`
}

type CheckInfo struct {
	Name   string `json:"name"`
	Room   string `json:"room"`
	Img    string `json:"img"`
	Status string `json:"status"`
	Time   string `json:"time"`
}
