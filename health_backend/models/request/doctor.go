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
