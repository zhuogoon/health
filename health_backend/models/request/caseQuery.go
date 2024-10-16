package request

import "time"

type CaseQuery struct {
	From  time.Time `json:"from"`
	To    time.Time `json:"to"`
	Title string    `json:"title"`
}
