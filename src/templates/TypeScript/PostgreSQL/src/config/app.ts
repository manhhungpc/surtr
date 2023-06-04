import dotenv from 'dotenv';

dotenv.config();

function env(key: string, defaultValue: null | string = null): string {
    return process.env[key] ?? (defaultValue as string);
}

export const appConfig = {
    node: env('NODE_ENV') || 'development',
    name: env('APP_NAME'),
    port: Number(env('APP_PORT')),
    routePrefix: env('APP_ROUTE_PREFIX'),
    jwtSecret: env('JWT_SECRET'),

    pg_host: env('PG_HOST'),
    pg_port: Number(env('PG_PORT')),
    pg_username: env('PG_USERNAME'),
    pg_password: env('PG_PASSWORD'),
    pg_database: env('PG_DATABASE'),
    pg_entities: env('PG_ENTITIES'),

    controllersDir: env('CONTROLLERS_DIR'),
    middlewaresDir: env('MIDDLEWARES_DIR'),

    formatDatetime: env('FORMAT_DATETIME', 'YYYY-MM-DD HH:mm:ss'),
    timezone: env('APP_TIMEZONE', 'Asia/Ho_Chi_Minh'),
};
