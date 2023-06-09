import dotenv from "dotenv";

dotenv.config();

function env(key: string, defaultValue: null | string = null): string {
    return process.env[key] ?? (defaultValue as string);
}

export const redisConfig = {
    host: env("REDIS_HOST"),
    port: env("REDIS_PORT"),
    username: Number(env("REDIS_USERNAME")),
    passWord: env("REDIS_PASSWORD"),
    db: env("REDIS_DATABASE"),
    // channel: env("REDIS_CHANNEL"),
};
