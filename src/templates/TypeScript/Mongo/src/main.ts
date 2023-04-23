import express from 'express';
import { appConfig } from './config/app';
import mongoose from 'mongoose';
import cors from 'cors';
import { corsOptions } from './utils/cors';

export class App {
    private app: express.Application = express();
    private PORT: Number = appConfig.port;
    public constructor() {
        this.init();
    }

    public async init() {
        await this.mongooseConnect();
    }

    private async mongooseConnect() {
        try {
            await mongoose.connect(appConfig.mongoosePath);
            console.log('Connect to mongoose is successful!');
        } catch (error) {
            console.log('Caught! Cannot connect to mongodb: ', error);
        }
    }

    public setupMiddleware() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cors(corsOptions));
    }
}
