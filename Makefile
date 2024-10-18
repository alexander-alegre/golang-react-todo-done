run: build
	@./tmp/main
	@cd web && npm run dev

install:
	@go get ./...
	@go mod vendor
	@go mod tidy
	@go mod download
	@cd web && npm install	


build:
	@go build -tags dev -o tmp/main main.go
	@cd web && npm run build


migration: ## Migrations against the database
	@migrate create -ext sql -dir cmd/migrate/migrations $(filter-out $@,$(MAKECMDGOALS))

up: ## Database migration up
	@go run cmd/migrate/main.go up

down: ## Database migration down
	@go run cmd/migrate/main.go down
