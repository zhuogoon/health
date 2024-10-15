package request

type Doctor struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Name     string `json:"name"`
	Honor    string `json:"honor"`
	JobTitle string `json:"job_title"`
	JobType  string `json:"job_type"`
	Phone    string `json:"phone"`
}

type DoctorCard struct {
	Name     string `json:"name"`
	Honor    string `json:"honor"`
	JobTitle string `json:"job_title"`
	JobType  string `json:"job_type"`
	Phone    string `json:"phone"`
	Img      string `json:"img"`
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

type GetByName struct {
	Name string `json:"name"`
}

type GetByJobType struct {
	JobType string `json:"job_type"`
}

type GetByNameJobType struct {
	Name    string `json:"name"`
	JobType string `json:"job_type"`
}
