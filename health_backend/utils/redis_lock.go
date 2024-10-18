package utils

import (
	"context"
	"health_backend/global"
	"time"
)

func ObtainLock(key string, expiration time.Duration) (bool, error) {
	success, err := global.RDB.SetNX(context.Background(), key, "locked", expiration).Result()
	if err != nil {
		return false, err
	}
	return success, nil
}

func ReleaseLock(key string) error {
	return global.RDB.Del(context.Background(), key).Err()
}
