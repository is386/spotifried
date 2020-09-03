# Spotifried

## About Spotifried

This website does two things. It shows a user's top 10 songs on Spotify, and it lets users search the top 10 songs of other users on the Spotifried website.

## Install Node Modules

Run `npm install` in both the `root` and `client` directories.

There is no need to delete the `node_modules` folders,`.gitignore` will ignore those folders.

## Setup Postgres Database

Create a file named `env.json` in the `root` directory. Add the following code to the file and add your Postgres password. This file is ignored by `.gitignore` so no need to worry about accidentally pushing your password. The `access_token_secret` is used to generate a JWT key, and it can be any random string of characters. We reccomend using an encryption library to generate it. The `client_id` and `client_secret` are provided by Spotify when you make a new project on their developer website.

```json
{
  "user": "postgres",
  "host": "localhost",
  "database": "user_login",
  "password": "POSTGRES_PASSWORD_HERE",
  "client_id": "CLIENT_ID_HERE",
  "client_secret": "CLIENT_SECRET_HERE",
  "redirect_uri": "http://localhost:5000/callback",
  "access_token_secret": "ACCESS_TOKEN_SECRET HERE",
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
    top10 json
);
```

## Run the Server and Website

Navigate to the `root` directory, then run the command `node server.js`.

Then navigate to the `client` directory, then run the command `npm start`.

Note: The server runs on port `5000` and the frontend runs on port `3000`.
