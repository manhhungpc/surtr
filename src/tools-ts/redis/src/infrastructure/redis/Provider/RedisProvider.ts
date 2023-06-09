import { redisConfig } from "@base/config/redis";
import Redis from "ioredis";

export class RedisProvider {
    private static instance: RedisProvider;
    public client: any;

    private constructor() {
        this.connect();
    }

    static async getInstance() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new RedisProvider();
        return this.instance;
    }

    public async connect() {
        this.client = new Redis({
            host: redisConfig.host,
            port: Number(redisConfig.port),
            username: redisConfig.username,
            password: redisConfig.password,
            db: Number(redisConfig.db),
        });
    }

    public async disconnect() {
        await this.client.quit();
    }
}
