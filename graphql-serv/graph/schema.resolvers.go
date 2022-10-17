package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"mock-graphql-server/graph/generated"
	"mock-graphql-server/graph/model"
	"mock-graphql-server/internal/pkg/db/repository"
	"strconv"
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
			updatedDrink, _ := repository.QueryDrinkID(&idStr)
			return updatedDrink, nil
		}
	} else {
		insertedId, err := repository.InsertDrink(drink)
		if err != nil {
			return nil, fmt.Errorf("not found")
		}
		idStr := strconv.Itoa(int(insertedId))
		insertedDrink, _ := repository.QueryDrinkID(&idStr)
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
