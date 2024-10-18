## Episode 1

- Setup Iris and React application

- Get iris framework

```
go get github.com/kataras/iris/v12
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

## Episode 4

- Create CRUD endpoints for TODO's

## Episode 5

- Call API endpoints from React application
