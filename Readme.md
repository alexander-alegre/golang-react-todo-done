## Episode 1

- Setup Iris and React application

- Get iris framework

```
go get github.com/kataras/iris/v12@latest
```

- Create web app

```
npm create vite@latest web -- --template react-ts
cd web
npm install
```

- Install Air

```
go install github.com/air-verse/air@latest
air -c .air.toml
```

## Episode 2

- Setup Tailwind CSS and DaisyUI

```
cd web
npm install -D tailwindcss postcss autoprefixer
npm i -D daisyui@latest
npx tailwindcss init -p
```

## Episode 3

- Setup database and migrations

```
go get github.com/uptrace/bun
go get github.com/uptrace/bun/dialect/pgdialect
go get github.com/uptrace/bun/extra/bundebug
go get github.com/golang-migrate/migrate/v4
go get github.com/golang-migrate/migrate/v4/database/postgres
go get github.com/joho/godotenv
```

```.env
DB_HOST="localhost"
DB_USER=""
DB_PASSWORD="postgres"
DB_NAME="go_todo"
APP_DEBUG=1
```

- Create migration files

```
make migration add_table_todos
```

## Episode 4

- Create CRUD endpoints for TODO's

## Episode 5

- Create UI

## Episode 6

- Call API endpoints from React application
