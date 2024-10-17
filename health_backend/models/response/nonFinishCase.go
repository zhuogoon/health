package response

type NonFinishCase struct {
	Id          uint   `json:"id"`
	PatientName string `json:"patient_name"`
	Age         int    `json:"age"`
	Birthday    string `json:"birthday"`
	UpdatedAt   string `json:"updated_at"`
	Sex         string `json:"sex"`
}
