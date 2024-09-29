package user

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"health_backend/global"
	"health_backend/models/db"
	"health_backend/models/response"
	"net/http"
	"os"
	"path/filepath"
)

// Upload 上传头像
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
	avatar, err := db.AvatarById()
	if err != nil {
		resp.Code = 450
		resp.Msg = "获取失败"
		c.AbortWithStatusJSON(http.StatusOK, resp)
		return
	}

	// 删除旧头像
	oldFilePath := filepath.Join(global.Config.UploadPath, avatar)
	if avatar != "" {
		if err := os.Remove(oldFilePath); err != nil {
			// 如果删除失败，不影响新头像的上传，记录日志即可
			fmt.Printf("删除旧头像失败: %v\n", err)
		}
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
	resp.Data = newFileName
	c.AbortWithStatusJSON(http.StatusOK, resp)
	return
}
