package apis

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"health_backend/global"
	"health_backend/middleware"
	"health_backend/models/db"
	"health_backend/models/request"
	"health_backend/models/response"
	"net/http"
	"path/filepath"
)

// Register 用户注册
func Register(c *gin.Context) {
	req := &request.UserRegisterReq{}
	resp := &response.BaseResponse{}
	err := c.ShouldBindBodyWithJSON(req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	err = db.Register(req.Username, req.Password)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = 200
	resp.Msg = "注册成功"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}

func Login(c *gin.Context) {
	req := &request.UserRegisterReq{}
	resp := &response.BaseResponse{}

	err := c.ShouldBindBodyWithJSON(req)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	b, err := db.IsUsername(req.Username)
	if b == false {
		if err == nil {
			resp.Code = 450
			resp.Msg = "用户未注册"
			c.AbortWithStatusJSON(http.StatusOK, resp)
			return
		}
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	err = db.IsPassword(req.Username, req.Password)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	jwt, err := middleware.Jwt(req.Username)
	if err != nil {
		resp.Code = 450
		resp.Msg = "构造token失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	c.Header("jwt", jwt)

	userresp := response.User{}
	userresp.Jwt = jwt

	resp.Code = 200
	resp.Msg = "登录成功"
	resp.Data = userresp
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return

}

func UpdatePassword(c *gin.Context) {
	user := &request.UserUpdatePassword{}
	resp := &response.BaseResponse{}

	err := c.ShouldBindBodyWithJSON(user)
	if err != nil {
		resp.Code = 450
		resp.Msg = "参数错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	err = db.UpdatePassword(user.Password)
	if err != nil {
		resp.Code = 450
		resp.Msg = "修改失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	// 将token 加入黑名单
	token := c.GetHeader("Authorization")
	if token != "" {
		global.RDB.Set(global.Ctx, token, "revoked", 0) // 将令牌加入黑名单，设置为永不过期
	}

	resp.Code = 450
	resp.Msg = "修改成功，请重新登录"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}

func Logout(c *gin.Context) {
	resp := &response.BaseResponse{}
	token := c.GetHeader("Authorization")
	if token == "" {
		resp.Code = 450
		resp.Msg = "你没登录"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	global.RDB.Set(global.Ctx, token, "revoked", 0) // 将令牌加入黑名单，设置为永不过期

	resp.Code = http.StatusOK
	resp.Msg = "退出成功"
	c.AbortWithStatusJSON(http.StatusOK, resp)
}

func Cancel(c *gin.Context) {
	resp := &response.BaseResponse{}
	err := db.CancelUser()
	if err != nil {
		resp.Code = 450
		resp.Msg = "注销失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	token := c.GetHeader("Authorization")
	if token == "" {
		resp.Code = 450
		resp.Msg = "你没登录"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	global.RDB.Set(global.Ctx, token, "revoked", 0)

	resp.Code = 450
	resp.Msg = "注销成功"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}

func Upload(c *gin.Context) {

	resp := &response.BaseResponse{}
	file, err := c.FormFile("file")
	if err != nil {
		resp.Code = 450
		resp.Msg = "文件错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	// 生成 UUID
	uniqueID := uuid.New().String()
	// 获取文件扩展名
	ext := filepath.Ext(file.Filename)
	// 创建新的文件名
	newFileName := fmt.Sprintf("%s%s", uniqueID, ext)

	dst := filepath.Join(global.Config.UploadPath, newFileName)

	err = c.SaveUploadedFile(file, dst)
	if err != nil {
		resp.Code = 450
		resp.Msg = "保存错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}
	err = db.Upload(newFileName)
	if err != nil {
		resp.Code = 450
		resp.Msg = "更新错误"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	resp.Code = http.StatusOK
	resp.Msg = "更新成功"
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
