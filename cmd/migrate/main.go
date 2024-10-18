package main

import (
	"database/sql"
	"log"
	"main/internal/pkg/db"
	"os"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	"github.com/joho/godotenv"

	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
)

func createDB() (*sql.DB, error) {
	if err := godotenv.Load(); err != nil {
		return nil, err
	}

	var (
		host   = os.Getenv("DB_HOST")
		user   = os.Getenv("DB_USER")
		pass   = os.Getenv("DB_PASSWORD")
		dbname = os.Getenv("DB_NAME")
	)

	return db.CreateDatabase(dbname, user, pass, host)
}

func main() {
	db, err := createDB()
	if err != nil {
		log.Fatal(err)
	}

	// create migration instance
	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		log.Fatal(err)
	}

	// point to migration files
	m, err := migrate.NewWithDatabaseInstance(
		"file://cmd/migrate/migrations", // source URL
		"postgres",                      // db name
		driver,                          // db instance
	)

	if err != nil {
		log.Fatal(err)
	}

	cmd := os.Args[len(os.Args)-1]

	if cmd == "up" {
		if err := m.Up(); err != nil && err != migrate.ErrNoChange {
			log.Fatal(err)
		}
	}
	if cmd == "down" {
		if err := m.Down(); err != nil && err != migrate.ErrNoChange {
			log.Fatal(err)
		}
	}

}
