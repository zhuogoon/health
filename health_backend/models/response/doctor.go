package response

type DoctorByName struct {
	Name     string `json:"name"`
	Honor    string `json:"honor"`
	JobTitle string `json:"job_title"`
	JobType  string `json:"job_type"`
	Phone    string `json:"phone"`
}
