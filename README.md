# Spotifried

## Install Node Modules

Run `npm install` in both the `root` and `client` directories.

There is no need to delete the `node_modules` folders,`.gitignore` will ignore those folders.

## Setup Postgres Database

Create a file named `env.json` in the `root` directory. Add the following code to the file and add your Postgres password. This file is ignored by `.gitignore` so no need to worry about accidentally pushing your password.

```json
{
  "user": "postgres",
  "host": "localhost",
  "database": "user_login",
  "password": "POSTGRES_PASSWORD_HERE",
  "client_id": "CLIENT_ID_HERE",
  "client_secret": "CLIENT_SECRET_HERE",
  "redirect_uri": "http://localhost:5000/callback",
  "port": 5432
}
```

Next, run `psql --username postgres` and execute the following SQL queries to create the `user_login` database and the `users` table:

```sql
CREATE DATABASE user_login;
\c user_login;
CREATE TABLE users (
    username VARCHAR(20),
    hashed_password CHAR(60),
    top10 json,
    top10_date DATE NOT NULL DEFAULT CURRENT_DATE
);
```

## Run the Server and Website

Navigate to the `root` directory, then run the command `node server.js`.

Then navigate to the `client` directory, then run the command `npm start`.
