package repository

import (
	"log"
	"strconv"

	"this-drink-doesnt-exist/graph/domain"
	"this-drink-doesnt-exist/graph/model"
	db "this-drink-doesnt-exist/internal/pkg/db/mysql"
)

// QueryAllDrinks return all drinks in table
func QueryAllDrinks() ([]*model.Drink, error) {
	selectAllQuery, err := db.Db.Prepare("select * from Drinks")
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer selectAllQuery.Close()

	rows, err := selectAllQuery.Query()
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer rows.Close()

	var drinks []*model.Drink
	for rows.Next() {
		var drink model.Drink
		rows.Scan(&drink.ID, &drink.Name, &drink.Flavour, &drink.Price, &drink.Type, &drink.ML, &drink.CreatedAt)
		drinks = append(drinks, &drink)
	}

	if err = rows.Err(); err != nil {
		log.Fatal(err)
		return nil, err
	}
	return drinks, nil
}

// QueryDrinkID return drink with respective ID
func QueryDrinkID(id *string) (*model.Drink, error) {
	selectQuery, err := db.Db.Prepare("select * from Drinks where id=?")
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer selectQuery.Close()

	rows, err := selectQuery.Query(id)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer rows.Close()

	var drink model.Drink
	for rows.Next() {
		err = rows.Scan(&drink.ID, &drink.Name, &drink.Flavour, &drink.Price, &drink.Type, &drink.ML, &drink.ImageBase64, &drink.CreatedAt)
		if err != nil {
			log.Fatal(err)
		}
	}

	if err = rows.Err(); err != nil {
		log.Fatal(err)
		return nil, err
	}
	return &drink, nil
}

// InsertDrink creates new drink
func InsertDrink(drink domain.Drink) (int64, error) {
	insertQuery, err := db.Db.Prepare("insert into Drinks(name,flavour,price,type,mL,image,) VALUES(?,?,?,?,?)")
	if err != nil {
		return 0, err
	}
	defer insertQuery.Close()

	res, err := insertQuery.Exec(drink.Name, drink.Flavour, drink.Price, drink.Type, drink.ML, drink.Image)
	if err != nil {
		return 0, err
	}

	id, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}

	return id, nil
}

func UpdateDrinkByID(id *string, drink domain.Drink) (int64, error) {
	updateQuery, err := db.Db.Prepare(`
		update Drinks set name=?, flavour=?, price=?, type=?, mL=?, image=?
		where id=?
	`)
	if err != nil {
		return 0, err
	}
	defer updateQuery.Close()

	_, err = updateQuery.Exec(drink.Name, drink.Flavour, drink.Price, drink.Type, drink.ML, drink.Image, id)
	if err != nil {
		return 0, err
	}

	updatedAt, err := strconv.ParseInt(*id, 10, 64)
	if err != nil {
		return 0, err
	}

	return updatedAt, nil
}
