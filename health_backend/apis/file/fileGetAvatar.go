package file

import (
	"github.com/gin-gonic/gin"
	"health_backend/global"
	"os"
	"path/filepath"
)

func GetFile(c *gin.Context) {
	img := c.Query("img")

	// 使用 filepath.Join 拼接文件路径
	files := filepath.Join(global.Config.UploadPath, img)

	// 检查文件是否存在
	if _, err := os.Stat(files); os.IsNotExist(err) {
		c.AbortWithStatusJSON(450, "获取失败")
		return
	}

	// 提供文件下载
	c.File(files)
	return
}
