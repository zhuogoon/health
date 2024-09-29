package apis

import (
	"github.com/gin-gonic/gin"
)

func User(r *gin.RouterGroup) {

	r.POST("register", Register)
	r.POST("login", Login)
	r.POST("update", UpdatePassword)
	r.GET("logout", Logout)
	r.GET("cancel", Cancel)
	r.POST("upload", Upload)
	r.GET("avatar", Avatar)

	r.POST("reg", RegLog)

}

func Doctor(r *gin.RouterGroup) {

	r.POST("create", Create)
	r.POST("update", UpdateDoctorInfo)
	r.GET("delete", DeleteDoctor)
}

func Patient(r *gin.RouterGroup) {
	r.POST("create", CreatePatient)
	r.GET("info", Info)
}

func Admin(r *gin.RouterGroup) {
	r.GET("getkey", AdminGetKey)
	r.POST("login", AdminLog)
}
