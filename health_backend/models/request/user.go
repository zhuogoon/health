package request

// UserRegisterReq 用户注册登录请求体
type UserRegisterReq struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type UserUpdatePassword struct {
	Password string `json:"password"`
}

type UserDownloadAvatar struct {
	Uuid string `json:"uuid"`
}
