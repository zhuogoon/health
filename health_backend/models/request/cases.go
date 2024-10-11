package request

type CaseDeleteTimeId struct {
	Id uint `json:"id"`
}

type CaseUpdateContent struct {
	Id      uint   `json:"id"`
	Content string `json:"content"`
}
type Params struct {
	Time string `json:"time" json:"time" binding:"required"`
}
type PaginationParams struct {
	Offset int `json:"offset"`
	Limit  int `json:"limit"`
}
