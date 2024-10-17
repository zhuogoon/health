package response

import "time"

type CheckInfo struct {
	ID        uint      `gorm:"primary_key" json:"id"`
	Name      string    `gorm:"column:name" json:"name"`
	Room      string    `gorm:"column:room" json:"room"`
	Status    string    `gorm:"column:status" json:"status"`
	CreatedAt time.Time `gorm:"column:created_at" json:"created_at"`
}
