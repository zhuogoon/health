package utils

import (
	"crypto/rand"
	"health_backend/global"
	"math/big"
	"time"
)

// GenerateRandomKey 生成随机 6 位密钥
func GenerateRandomKey() (string, error) {
	const charset = "0123456789"
	result := make([]byte, 6)
	for i := range result {
		num, _ := rand.Int(rand.Reader, big.NewInt(int64(len(charset))))
		result[i] = charset[num.Int64()]
	}

	key := string(result)

	err := StoreKeyInRedis(key)
	if err != nil {
		return "", err
	}

	return key, nil
}

// StoreKeyInRedis 存储密钥到 Redis，设置有效期为 1 分钟
func StoreKeyInRedis(key string) error {
	err := global.RDB.Set(global.Ctx, "admin_key", key, 1*time.Minute).Err()
	return err
}

// VerifyKey 验证密钥
func VerifyKey(inputKey string) bool {
	storedKey, err := global.RDB.Get(global.Ctx, "admin_key").Result()
	if err != nil {
		return false
	}
	return storedKey == inputKey
}
