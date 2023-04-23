import dotenv from 'dotenv';

dotenv.config();

function env(key: string, defaultValue: null | string = null): string {
    return process.env[key] ?? (defaultValue as string);
}

export const appConfig = {
    node: env('NODE_ENV') || 'development',
    port: Number(env('APP_PORT')),
    routePrefix: env('APP_ROUTE_PREFIX'),
    mongoosePath: env('MONGOOSE_PATH'),
};
