package request

type UpdateTimeId struct {
	Id     uint `json:"id"`
	TimeId int  `json:"time_id"`
}

type DeleteTimeId struct {
	Id uint `json:"id"`
}
type GetInfoByIdResp struct {
	TimeId uint `json:"time_id"`
}

type Increase struct {
	DoctorId uint   `json:"doctor_id"`
	TimeId   int    `json:"time_id"`
	Time     string `json:"time"`
}
