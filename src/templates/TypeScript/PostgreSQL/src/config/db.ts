import { DataSource } from 'typeorm';
import { appConfig } from './app';

export const pgPool = new DataSource({
    type: 'postgres',
    host: appConfig.pg_host,
    port: appConfig.pg_port,
    username: appConfig.pg_username,
    password: appConfig.pg_password,
    database: appConfig.pg_database,
    entities: appConfig.pg_entities as any,
});
