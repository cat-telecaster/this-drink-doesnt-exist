package repository

import (
	"encoding/base64"
	"log"
	"strconv"
	"this-drink-doesnt-exist/graph/domain"
	"this-drink-doesnt-exist/graph/model"
	db "this-drink-doesnt-exist/internal/pkg/db/mysql"
	"time"
)

//
//type rawTime []byte
//
//func (t rawTime) Time() (time.Time, error) {
//	return time.Parse(layout, string(t))
//}

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
	var imgBytes []byte
	var rawTime int64
	for rows.Next() {
		var drink model.Drink
		rows.Scan(&drink.ID, &drink.Name, &drink.Flavour, &drink.Price, &drink.Type, &drink.ML, &rawTime, &imgBytes)
		drink.ImageBase64 = base64.StdEncoding.EncodeToString(imgBytes)
		t := time.Unix(rawTime, 0)
		drink.CreatedAt = t.Format("2006-01-02 15:04:05")
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
	var imgBytes []byte
	var rawTime int64
	for rows.Next() {
		err := rows.Scan(&drink.ID, &drink.Name, &drink.Flavour, &drink.Price, &drink.Type, &drink.ML, &rawTime, &imgBytes)
		if err != nil {
			return nil, err
		}
		t := time.Unix(rawTime, 0)
		drink.CreatedAt = t.Format("2006-01-02 15:04:05")
		drink.ImageBase64 = base64.StdEncoding.EncodeToString(imgBytes)
	}

	if err = rows.Err(); err != nil {
		log.Fatal(err)
		return nil, err
	}
	return &drink, nil
}

// InsertDrink creates new drink
func InsertDrink(drink domain.Drink) (int64, error) {
	insertQuery, err := db.Db.Prepare("insert into Drinks(name,flavour,price,type,mL,image,created_at) VALUES(?,?,?,?,?,?,?)")
	if err != nil {
		return 0, err
	}
	defer insertQuery.Close()

	res, err := insertQuery.Exec(drink.Name, drink.Flavour, drink.Price, drink.Type, drink.ML, drink.Image, drink.CreatedAt)
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
