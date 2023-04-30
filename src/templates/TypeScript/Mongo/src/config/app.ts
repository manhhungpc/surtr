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

    mongoosePath: env('MONGOOSE_PATH'),
    controllersDir: env('CONTROLLERS_DIR'),
    middlewaresDir: env('MIDDLEWARES_DIR'),

    formatDatetime: env('FORMAT_DATETIME', 'YYYY-MM-DD HH:mm:ss'),
    timezone: env('APP_TIMEZONE', 'Asia/Ho_Chi_Minh'),
};
