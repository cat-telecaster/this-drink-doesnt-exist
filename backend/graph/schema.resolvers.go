package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"strconv"
	"this-drink-doesnt-exist/graph/domain"
	"this-drink-doesnt-exist/graph/generated"
	"this-drink-doesnt-exist/graph/model"
	"this-drink-doesnt-exist/internal/pkg/api"
	"this-drink-doesnt-exist/internal/pkg/db/repository"
)

// UpsertDrink is the resolver for the upsertDrink field.
func (r *mutationResolver) UpsertDrink(ctx context.Context, input model.NewDrink) (*model.Drink, error) {
	id := input.ID

	prompt := GeneratePrompt(input)
	imageBase64, err := api.GenerateImage(prompt)
	if err != nil {
		return nil, err
	}
	img := <-imageBase64

	fmt.Println("gof")

	drink, err := domain.NewDrink(
		input.Name,
		input.Flavour,
		input.Price,
		input.Type,
		input.ML,
		img,
	)
	if err != nil {
		return nil, err
	}

	if id != nil {
		queriedDrink, err := repository.QueryDrinkID(id)
		if err != nil {
			return nil, err
		}
		if queriedDrink != nil {
			updatedId, err := repository.UpdateDrinkByID(id, *drink)
			if err != nil {
				return nil, fmt.Errorf("not found")
			}
			idStr := strconv.Itoa(int(updatedId))
			updatedDrink, err := repository.QueryDrinkID(&idStr)
			if err != nil {
				return nil, fmt.Errorf("inserted drink not found")
			}

			fmt.Printf("%v\n", updatedDrink)

			return updatedDrink, nil
		}
	} else {
		insertedId, err := repository.InsertDrink(*drink)
		if err != nil {
			return nil, fmt.Errorf("not found")
		}
		idStr := strconv.Itoa(int(insertedId))
		insertedDrink, err := repository.QueryDrinkID(&idStr)
		if err != nil {
			return nil, fmt.Errorf("inserted drink not found")
		}

		fmt.Printf("%v\n", insertedDrink)

		return insertedDrink, nil
	}

	gqlDrink := DrinkDomain2Gql(*id, drink)

	fmt.Printf("%v\n", gqlDrink)

	return gqlDrink, nil
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
