package request

// UserRegisterReq 用户注册请求体
type UserRegisterReq struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// UserLoginReq 用户登录请求体
type UserLoginReq struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
