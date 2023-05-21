# Introduction

This is starter template for building Node.js RESTful APIs with MongoDB in Javascript.

Build your millions dollar app faster and ignore hours of config and setup

# Get started

```ssh
npm install
# Make a copy of file enviroment and update some config.
cp .env.example .env

# Run Application
npm run dev
```

Documentation available at: `/api/docs`

# Documentation

### Tech stack

-   NodeJS / ExpressJS / Javascript
-   MongoDB

### Features

-   Web backend framework [ExpressJS](https://expressjs.com/) for building RESTful APIs
-   Easy MongoDB query with [mongoose](https://mongoosejs.com/)
-   Support OpenAPI documentation
-   Authorization with [jsonwebtoken](https://jwt.io/)
-   Beatify your code with [prettier](https://prettier.io/)

### Project Structure

| Name                     | Description                                                                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| **dist/**                | Compiled source files will be placed here                                                          |
| **src/**                 | Source files                                                                                       |
| **src/config**           | The config directory, as the name implies, contains all of your application's configuration files. |
| **src/api/controllers/** | REST API Controllers                                                                               |
| **src/api/responses**    | Response classes or interfaces to type json response bodies                                        |
| **src/api/exceptions/**  | (WIP) Custom HttpErrors like 404 NotFound                                                          |
| **src/api/models/**      | MongDB Models                                                                                      |
| **src/api/services/**    | Service layer                                                                                      |
| **.env.example**         | Environment configurations                                                                         |
| **jsconfig.json**        | Javascript config file                                                                             |
