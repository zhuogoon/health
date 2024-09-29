package user

import (
	"github.com/gin-gonic/gin"
	"health_backend/global"
	"health_backend/models/db"
	"health_backend/models/response"
	"net/http"
	"os"
	"path/filepath"
)

// Avatar 获取头像
func Avatar(c *gin.Context) {

	resp := &response.BaseResponse{}
	avatar, err := db.AvatarById()
	if err != nil {
		resp.Code = 450
		resp.Msg = "获取失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	// 使用 filepath.Join 拼接文件路径
	files := filepath.Join(global.Config.UploadPath, avatar)

	// 检查文件是否存在
	if _, err := os.Stat(files); os.IsNotExist(err) {
		resp.Code = 450
		resp.Msg = "获取失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	// 提供文件下载
	c.File(files)
	return
}
