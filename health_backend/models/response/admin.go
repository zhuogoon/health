package response

type GetCount struct {
	DoctorCount       int64 `json:"doctor_count"`
	CheckProjectCount int64 `json:"check_project_count"`
	PatientCount      int64 `json:"patient_count"`
}
