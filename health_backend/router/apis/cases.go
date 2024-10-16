package apis

import (
	"github.com/gin-gonic/gin"
	"health_backend/apis/cases"
)

func Cases(r *gin.RouterGroup) {
	r.POST("increase", cases.CaseIncrease)
	r.GET("list", cases.CaseList)
	r.GET("delete", cases.CaseDelete)
	r.POST("update", cases.CaseUpdate)
	r.GET("info", cases.CaseIdList)
	r.GET("inquiry", cases.TimeInquiry)
	r.GET("pagination", cases.Pagination)
	r.GET("latest", cases.GetLatestCaseByUserID)
	r.POST("query", cases.QueryCases)
	r.GET("details", cases.GetCaseDetails)
}
