package domain

import (
	"encoding/base64"
	"time"
)

type Drink struct {
	Name      string
	Flavour   string
	Price     int
	Type      string
	ML        int
	Image     []byte
	CreatedAt int64
}

func NewDrink(
	name string,
	flavour string,
	price *int,
	drinkType string,
	mL int,
	imgb64 string,
) (*Drink, error) {
	var dPrice = 0
	if price != nil {
		dPrice = *price
	}

	imgBytes, err := base64.StdEncoding.DecodeString(imgb64)
	if err != nil {
		return nil, err
	}

	return &Drink{
		Name:      name,
		Flavour:   flavour,
		Price:     dPrice,
		Type:      drinkType,
		ML:        mL,
		Image:     imgBytes,
		CreatedAt: time.Now().Unix(),
	}, nil
}
