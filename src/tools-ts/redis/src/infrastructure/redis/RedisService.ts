import { RedisClient } from "@base/infrastructure/redis/Provider/RedisProvider";

export class RedisService {
    public static async get(key: any, json: boolean = true) {
        const redisClient = await RedisClient.getInstance();
        const client = redisClient.client;
        const data = await client.get(key);
        if (json) return JSON.parse(data);
        return data;
    }
    public static async set(key: any, value: any) {}
}
