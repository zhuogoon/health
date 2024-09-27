package response

type PatientInfo struct {
	Id             uint    `json:"id"`
	UserId         uint    `json:"user_id"`
	Name           string  `json:"name"`
	Height         float32 `json:"height"`
	Weight         float32 `json:"weight"`
	Age            uint    `json:"age"`
	Sex            bool    `json:"sex"`
	MedicalHistory string  `json:"medical_history"`
	Phone          string  `json:"phone"`
	Address        string  `json:"address"`
	Allergens      string  `json:"allergens"`
}
