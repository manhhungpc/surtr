import dotenv from 'dotenv';

dotenv.config();

function env(key, defaultValue = null) {
    return process.env[key] ?? defaultValue;
}

export const appConfig = {
    node: env('NODE_ENV') || 'development',
    name: env('APP_NAME'),
    port: Number(env('APP_PORT')),
    host: Number(env('APP_HOST')),
    routePrefix: env('APP_ROUTE_PREFIX'),
    jwtSecret: env('JWT_SECRET'),

    mongoosePath: env('MONGOOSE_PATH'),

    formatDatetime: env('FORMAT_DATETIME', 'YYYY-MM-DD HH:mm:ss'),
    timezone: env('APP_TIMEZONE', 'Asia/Ho_Chi_Minh'),
};
