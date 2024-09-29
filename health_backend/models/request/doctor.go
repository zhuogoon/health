package request

type Doctor struct {
	Username string `json:"username"`
	Password string `json:"password"`
	UserId   string `json:"user_id"`
	Name     string `json:"name"`
	Honor    string `json:"honor"`
	JobTitle string `json:"job_title"`
	JobType  string `json:"job_type"`
	Phone    string `json:"phone"`
}

type UpdateDoctor struct {
	UserId   uint   `json:"user_id"`
	Name     string `json:"name"`
	Honor    string `json:"honor"`
	JobTitle string `json:"job_title"`
	JobType  string `json:"job_type"`
	Phone    string `json:"phone"`
}

type AddCheck struct {
	DoctorId       uint `json:"doctor_id"`
	CheckProjectId uint `json:"check_project_id"`
	PatientId      uint `json:"patient_id"`
}
