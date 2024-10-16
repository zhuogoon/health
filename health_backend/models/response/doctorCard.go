package response

type DoctorCard struct {
	ID       uint   `json:"id"`
	Name     string `json:"name"`
	Honor    string `json:"honor"`
	JobTitle string `json:"job_title"`
	JobType  string `json:"job_type"`
	Phone    string `json:"phone"`
	Img      string `json:"img"`
}
