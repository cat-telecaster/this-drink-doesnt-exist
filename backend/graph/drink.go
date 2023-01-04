package graph

import (
	"encoding/base64"

	"this-drink-doesnt-exist/graph/domain"
	"this-drink-doesnt-exist/graph/model"
)

func DrinkDomain2Gql(id string, d *domain.Drink) *model.Drink {
	return &model.Drink{
		ID:          id,
		Name:        d.Name,
		Flavour:     d.Flavour,
		Price:       &d.Price,
		Type:        d.Type,
		ML:          d.ML,
		ImageBase64: base64.StdEncoding.EncodeToString(d.Image),
	}
}
