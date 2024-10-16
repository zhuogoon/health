package request

import "time"

type AppointQuery struct {
	From   time.Time `json:"from"`
	To     time.Time `json:"to"`
	Status uint      `json:"status"`
}
