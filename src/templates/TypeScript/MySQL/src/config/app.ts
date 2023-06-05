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
    jwtExpires: env('JWT_EXPIRES', '7d'),

    typeORM_Host: env('TYPEORM_HOST'),
    typeORM_Port: Number(env('TYPEORM_PORT')),
    typeORM_Username: env('TYPEORM_USERNAME'),
    typeORM_Password: env('TYPEORM_PASSWORD'),
    typeORM_Database: env('TYPEORM_DATABASE'),
    typeORM_Sync: Boolean(env('TYPEORM_SYNCHRONIZE')),
    typeORM_Log: Boolean(env('TYPEORM_LOGGING')),
    typeORM_Entities: env('TYPEORM_ENTITIES'),
    typeORM_Migrations: env('TYPEORM_MIGRATIONS'),

    controllersDir: env('CONTROLLERS_DIR'),
    middlewaresDir: env('MIDDLEWARES_DIR'),

    formatDatetime: env('FORMAT_DATETIME', 'YYYY-MM-DD HH:mm:ss'),
    timezone: env('APP_TIMEZONE', 'Asia/Ho_Chi_Minh'),
};
