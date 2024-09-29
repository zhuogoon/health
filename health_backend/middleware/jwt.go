package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"health_backend/global"
	"health_backend/models"
	"health_backend/models/db"
	"health_backend/models/response"
	"net/http"
	"strings"
	"time"
)

type JwtStruct struct {
	jwt.RegisteredClaims
	Username string      `json:"username"`
	Role     models.Role `json:"role"`
}

// Jwt 添加jwt
func Jwt(username string) (string, error) {
	r, err := db.FindRole(username)
	if err != nil {
		return "", err
	}

	jwts := &JwtStruct{}
	jwts.Username = username
	jwts.Role = r
	jwts.ExpiresAt = jwt.NewNumericDate(time.Now().Add(time.Hour * 2))
	jwts.IssuedAt = jwt.NewNumericDate(time.Now())

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwts)
	signingString, err := token.SignedString(global.Sign)
	if err != nil {
		return "", err
	}
	return signingString, nil
}

// JwtParse 解析jwt
func JwtParse() gin.HandlerFunc {
	return func(c *gin.Context) {
		resp := &response.BaseResponse{}

		allowedPaths := []string{
			"/api/user/login",
			"/api/user/register",
			"/api/doctor/create",
			"/api/user/reg",
			"/api/user/avatar",
		}

		for _, path := range allowedPaths {
			if c.Request.URL.Path == path {
				return
			}
		}

		auth := c.Request.Header.Get("Authorization")
		if auth == "" {
			resp.Code = http.StatusOK
			resp.Msg = "你没登录"
			c.AbortWithStatusJSON(http.StatusOK, resp)
			return
		}

		// 检查黑名单
		val, err := global.RDB.Get(global.Ctx, auth).Result()
		if err == nil && val == "revoked" {
			resp.Code = http.StatusOK
			resp.Msg = "请重新登录"
			c.AbortWithStatusJSON(http.StatusOK, resp)
			return
		}

		t := strings.Split(auth, " ")
		if len(t) != 2 {
			resp.Code = http.StatusOK
			resp.Msg = "你没登录"
			c.AbortWithStatusJSON(http.StatusOK, resp)
			return
		}
		token := t[1]
		claims := &JwtStruct{}

		withClaims, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
			return global.Sign, nil
		})
		if err != nil {
			resp.Code = http.StatusOK
			resp.Msg = "你没登录"
			c.AbortWithStatusJSON(http.StatusOK, resp)
			return
		}
		if withClaims == nil || !withClaims.Valid || claims.Username == "" {
			resp.Code = http.StatusOK
			resp.Msg = "你没登录"
			c.AbortWithStatusJSON(http.StatusOK, resp)
			return
		}
		c.Set("username", claims.Username)
		id, err := db.GetIdByUsername(claims.Username)
		if err != nil {
			resp.Code = http.StatusOK
			resp.Msg = "你没登录"
			c.AbortWithStatusJSON(http.StatusOK, resp)
			return
		}
		role, err := db.FindRole(claims.Username)
		if err != nil {
			resp.Code = http.StatusOK
			resp.Msg = "你没登录"
			c.AbortWithStatusJSON(http.StatusOK, resp)
			return
		}

		c.Set("role", role)
		global.Role = role
		c.Set("userid", id)
		global.UserId = id
	}
}
