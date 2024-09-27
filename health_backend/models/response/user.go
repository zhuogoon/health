package response

type User struct {
	Id       uint   `json:"id"`
	Username string `json:"username"`
	Jwt      string `json:"jwt"`
	Status   bool   `json:"status"`
}
