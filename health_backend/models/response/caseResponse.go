package response

import "health_backend/models"

type CaseResponseVO struct {
	models.Case
	Check []models.Check
}
