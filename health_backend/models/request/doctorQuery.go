package request

type DoctorQuery struct {
	DoctorName string `json:"doctor_name"`
	DoctorType string `json:"doctor_type"`
}
