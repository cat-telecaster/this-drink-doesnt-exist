package graph

import "this-drink-doesnt-exist/graph/model"

func GeneratePrompt(input model.NewDrink) string {
	price := ""

	if input.Price == nil {
		price = "free "
	}
	if *input.Price > 400 && *input.Price <= 1000 {
		price = "expensive "
	}
	if *input.Price > 1000 {
		price = "really fancy "
	}

	size := ""
	if input.ML == 0 {
		size = "ethereal "
	}
	if input.ML > 0 && input.ML <= 150 {
		size = "tiny "
	}
	if input.ML > 1000 && input.ML <= 2000 {
		size = "large "
	}
	if input.ML > 2000 && input.ML <= 4000 {
		size = "huge "
	}
	if input.ML > 4000 {
		size = "horrifically large "
	}

	flavour := input.Flavour + " flavored "
	drinkType := input.Type + " drink"

	prompt := size + price + flavour + input.Name + " " + drinkType

	return prompt
}
