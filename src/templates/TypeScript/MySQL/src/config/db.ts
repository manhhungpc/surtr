import { DataSource } from 'typeorm';
import { appConfig } from './app';

export const dataSource = new DataSource({
    type: 'mysql',
    name: appConfig.typeORM_Username,
    host: appConfig.typeORM_Host,
    port: appConfig.typeORM_Port,
    username: appConfig.typeORM_Username,
    password: appConfig.typeORM_Password,
    database: appConfig.typeORM_Database,
    logging: appConfig.typeORM_Log,
    synchronize: appConfig.typeORM_Sync,
    entities: appConfig.typeORM_Entities as any,
});
