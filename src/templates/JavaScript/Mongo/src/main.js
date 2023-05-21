import express from 'express';
import cors from 'cors';
import { corsOption } from './utils/cors';
import { appConfig } from './config/app';
import router from './api/routes';
import swaggerDocs from './config/swagger';
import swaggerUI from 'swagger-ui-express';
import mongoose from 'mongoose';

const app = express();
const PORT = appConfig.port;

async function init() {
    await connectMongoose();
    setupMiddleware();
    configRoute();
    startServer();
    registerDefaultHomePage();
    register404Page();
}
init();

async function connectMongoose() {
    try {
        await mongoose.connect(appConfig.mongoosePath);
        console.log('Connect to mongoose is successful!');
    } catch (error) {
        console.log('Caught! Cannot connect to mongodb: ', error);
    }
}

function setupMiddleware() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors(corsOption));
}

function configRoute() {
    app.use(appConfig.routePrefix, router);
    app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
}

function registerDefaultHomePage() {
    app.get('/', (req, res) => {
        res.json({
            title: appConfig.name,
            mode: appConfig.node,
        });
    });
}

function register404Page() {
    app.get('*', function (req, res) {
        res.status(404).send({ status: 404, message: 'Page Not Found!' });
    });
}

function startServer() {
    app.listen(PORT, () => {
        console.log(`🚀 Server started at http://localhost:${PORT} \n🚨️ Environment: ${process.env.NODE_ENV}`);
    });
}
