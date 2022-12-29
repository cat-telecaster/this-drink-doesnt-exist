package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"strconv"

	"this-drink-doesnt-exist/graph/generated"
	"this-drink-doesnt-exist/graph/model"
	"this-drink-doesnt-exist/internal/pkg/api"
	"this-drink-doesnt-exist/internal/pkg/db/repository"
)

// UpsertDrink is the resolver for the upsertDrink field.
func (r *mutationResolver) UpsertDrink(ctx context.Context, input model.NewDrink) (*model.Drink, error) {
	id := input.ID
	var drink model.Drink
	drink.Flavour = input.Flavour
	drink.Price = input.Price
	drink.Type = input.Type
	drink.ML = input.ML
	drink.Name = input.Name

	prompt := GeneratePrompt(input)
	imageBase64, err := api.GenerateImage(prompt)
	if err != nil {
		return nil, <-err
	}
	img := <-imageBase64
	drink.ImageBase64 = img.GeneratedImgs[0]

	if id != nil {
		queriedDrink, err := repository.QueryDrinkID(id)
		if err != nil {
			return nil, err
		}
		if queriedDrink != nil {
			updatedId, err := repository.UpdateDrinkByID(id, drink)
			if err != nil {
				return nil, fmt.Errorf("not found")
			}
			idStr := strconv.Itoa(int(updatedId))
			updatedDrink, err := repository.QueryDrinkID(&idStr)
			if err != nil {
				return nil, fmt.Errorf("inserted drink not found")
			}
			return updatedDrink, nil
		}
	} else {
		insertedId, err := repository.InsertDrink(drink)
		if err != nil {
			return nil, fmt.Errorf("not found")
		}
		idStr := strconv.Itoa(int(insertedId))
		insertedDrink, err := repository.QueryDrinkID(&idStr)
		if err != nil {
			return nil, fmt.Errorf("inserted drink not found")
		}
		return insertedDrink, nil
	}

	return &drink, nil
}

// DrinkID is the resolver for the drinkID field.
func (r *queryResolver) DrinkID(ctx context.Context, id string) (*model.Drink, error) {
	drink, err := repository.QueryDrinkID(&id)
	if err != nil {
		return nil, fmt.Errorf("not found")
	}

	return drink, nil
}

// Drinks is the resolver for the drinks field.
func (r *queryResolver) Drinks(ctx context.Context) ([]*model.Drink, error) {
	drinks, err := repository.QueryAllDrinks()
	if err != nil {
		return nil, err
	} else {
		return drinks, err
	}
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
