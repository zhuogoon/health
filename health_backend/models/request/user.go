package request

import "health_backend/models"

type UserLoginReq struct {
	Username string      `json:"username"`
	Password string      `json:"password"`
	Role     models.Role `json:"role"`
}
