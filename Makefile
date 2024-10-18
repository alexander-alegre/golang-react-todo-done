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
