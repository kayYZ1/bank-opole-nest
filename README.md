
# NestJS Bank

NestJS is a REST Api Backend service for a (mock) bank that showcases the most frequent banking operations.

Project uses:
- TypeScript
- Jest
- Docker
- Github Actions for CI/CD
- JWT for authentication and authorization




## API Reference (just a few endpoints)

#### Log in to the system

```http
  POST /auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** Email |
| `password`| `string` | **Required** Password |

#### Get item

```http
  GET /auth/refresh
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Requires accessToken to be stored in Authorization Header |

Used whenever accessToken is about to expire. Takes userId and refreshToken from 'req' and uses it to refresh current token.

```http
  GET /currency-exchange/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Requires accessToken to be stored in Authorization Header |

Scrapes currencies of Euro, US Dolar and Sterling and returns it to showcase their current stand to Polish Złoty.

```http
  POST /loan-calculator/mortgage
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Requires accessToken to be stored in Authorization Header |

Uses mathematical equation to calculate the mortage cost based on: amount, interest rate, number of installments and period of payment.



## Environment Variables

To run this project, it is required to prepare a few environment variables in the .env.development.local file.

### PostgreSQL config

`DB_TYPE`
`PG_USER`
`PG_DB`
`PG_PASSWORD`
`PG_PORT`
`PG_HOST`

### JWT secrets

`SECRET`
`ACCESS_SECRET`
`REFRESH_SECRET`
## Run Locally

### NPM
Clone the project

```bash
  git clone https://github.com/kayYZ1/nest-bank-service.git
```

Go to the project directory

```bash
  cd nest-bank-service
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
### Docker

Clone the project
```bash
  git clone https://github.com/kayYZ1/nest-bank-service.git
```

Go to the project directory

```bash
  cd nest-bank-service
```

Use docker compose to run images

```bash
  docker compose up
```

## Running Tests

To run unit tests

```bash
  npm run test
```

To run end to end tests

```bash
  npm run test:e2e
```
