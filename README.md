# Surtr

A template generator for Express.js project with pre-configured databases.

## Generate project

```shell
> npx create-surtr
```

![example-cmd](/assets/example-cmd.png)

## Feature

-   Generate template for Express.js project with Typescript or Javascript using command line
-   Choose which database for each type (MongoDB, MySQL, Postgre)
-   Config with additional tools/services (redis, docker, ...)

## Develop locally

### Install dependencies and running

1. Run **`npm install`** at repository root
2. **`npm run dev`** to start the generator's cli locally at current directory

### Test generator

1. Run **`npm run build`**
2. If you want to run generator anywhere locally:
    ```shell
    npm link
    ```
    Or run at repository root: **`npm start`**
3. After that, you can either run **`npx create-surtr`** or **`surtr`** to generate template

## Future works:

-   Add more database's template for TS, JS
-   Add more configuration for tools/services

## Contribution

Any suggestions for this project are welcomed!

Feel free to contribute, just open an issue and create a pull request!
