package graph

import (
	"encoding/base64"
	"this-drink-doesnt-exist/graph/domain"
	"this-drink-doesnt-exist/graph/model"
	"time"
)

var layout = "2006-01-02 15:04:05"

func DrinkDomain2Gql(id string, d *domain.Drink) *model.Drink {
	t := time.Unix(d.CreatedAt, 0)

	return &model.Drink{
		ID:          id,
		Name:        d.Name,
		Flavour:     d.Flavour,
		Price:       &d.Price,
		Type:        d.Type,
		ML:          d.ML,
		ImageBase64: base64.StdEncoding.EncodeToString(d.Image),
		CreatedAt:   t.Format(layout),
	}
}
