package response

type GetCount struct {
	DoctorCount       int64 `json:"doctor_count"`
	CheckProjectCount int64 `json:"check_project_count"`
	PatientCount      int64 `json:"patient_count"`
}

type DoctorInfo struct {
	Id       uint   `json:"id"`
	Name     string `json:"name"`
	Honor    string `json:"honor"`
	JobTitle string `json:"job_title"` //职称
	JobType  string `json:"job_type"`  //科室
	Phone    string `json:"phone"`
}

type GetPatientInfo struct {
	Id      uint    `json:"id"`
	Name    string  `json:"name"`
	Height  float32 `json:"height"`
	Weight  float32 `json:"weight"`
	Sex     string  `json:"sex"`
	Phone   string  `json:"phone"`
	Address string  `json:"address"`
}
