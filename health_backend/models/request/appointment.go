package request

type UpdateTimeId struct {
	Id     uint `json:"id"`
	TimeId int  `json:"time_id"`
}

type DeleteTimeId struct {
	Id uint `json:"id"`
}
