package request

type CreateCheck struct {
	DoctorID       int `json:"doctor_id"`
	PatientID      int `json:"patient_id"`
	CheckProjectID int `json:"check_project_id"`
	CaseID         int `json:"case_id"`
}
