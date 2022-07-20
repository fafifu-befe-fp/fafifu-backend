# Second Hand

Platform ini merupakan tempat jual-beli barang secara online, khususnya barang bekas. Platform ini membuka dan menyediakan berbagai jenis
kategori kebutuhan. User yang mendaftarkan diri pada aplikasi ini dapat berperan sebagai seller dan buyer dengan menggunakan 1 (satu) akun
yang sama. Platform ini akan mempertemukan seller dan buyer untuk dapat melakukan negosiasi barang dan melakukan transaksi langsung di luar
platform.

## Run Locally

Clone the project

```bash
  git clone https://github.com/fafifu-befe-fp/fafifu-backend.git
```

Go to the project directory

```bash
  cd fafifu-backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

Create the database

```bash
  sequelize db:create
```

Migration the database

```bash
  sequelize db:migrate
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DEV_DB_USERNAME`
`DEV_DB_PASSWORD`
`DEV_DB_NAME`
`DEV_DB_HOST`

`TEST_DB_USERNAME`
`TEST_DB_PASSWORD`
`TEST_DB_NAME`
`TEST_DB_HOST`

`DATABASE_URL`

`BCRYPT_SALT`

`JWT_SECRET_KEY`
`JWT_ACCESS_EXPIRATION_MINUTES`
`JWT_REFRESH_EXPIRATION_DAYS`
`JWT_RESET_PASSWORD_EXPIRATION_MINUTES`
`JWT_VERIFY_EMAIL_EXPIRATION_MINUTES`

`CLOUDINARY_CLOUD_NAME`
`CLOUDINARY_API_KEY`
`CLOUDINARY_API_SECRET`

## Documentation

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/13454122-81013ead-a659-40c7-83f9-87df92dc9ba0?action=collection%2Ffork&collection-url=entityId%3D13454122-81013ead-a659-40c7-83f9-87df92dc9ba0%26entityType%3Dcollection%26workspaceId%3Dfcb8e2d3-0d53-4651-8163-19095143be9a#?env%5BRelease%20Environment%5D=W3sia2V5IjoiVVJMX0FQSSIsInZhbHVlIjoiaHR0cHM6Ly9mYWZpZnUtYmFja2VuZC1hcGkuaGVyb2t1YXBwLmNvbSIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiaHR0cHM6Ly9mYWZpZnUtYmFja2VuZC1hcGkuaGVyb2t1YXBwLmNvbSIsInNlc3Npb25JbmRleCI6MH0seyJrZXkiOiJBQ0NFU1NfVE9LRU4iLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJzZWNyZXQiLCJzZXNzaW9uVmFsdWUiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKd2RXSnNhV05KWkNJNkltSTNOalJqWWpNeExUZGhaR1F0TkdOak15MWlZMll4TFdabE1ESXpNakpsT1dZMk1DSXNJbVZ0WVdsc0lqb2lZV1JwUUcxaGFXd3VZMjl0SWl3aS4uLiIsInNlc3Npb25JbmRleCI6MX1d)

## Tech Stack

**Server:** Node, Express, PostgreSQL
