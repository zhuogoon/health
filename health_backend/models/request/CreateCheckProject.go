package request

type CreateCheckProject struct {
	Name string `json:"name"`
	Room string `json:"room"`
}
