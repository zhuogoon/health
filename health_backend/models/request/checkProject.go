package request

type CheckProject struct {
	Name string `json:"name"`
	Room string `json:"room"`
}

type UpdateCheckProject struct {
	Id   uint   `json:"id"`
	Name string `json:"name"`
	Room string `json:"room"`
}

type DeleteCheck struct {
	Id uint `json:"id"`
}
