package response

type CheckProjectResponse struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
	Room string `json:"room"`
}
