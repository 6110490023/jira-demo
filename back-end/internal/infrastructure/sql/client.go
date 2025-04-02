package sqladaptor

import (
	"fmt"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func GetClientSQL(username, password, hostName, nameDB string) (*sqlx.DB, error) {
	connStr := fmt.Sprintf("postgres://%s:%s@%s/%s", username, password, hostName, nameDB)
	db, err := sqlx.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}
	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}
