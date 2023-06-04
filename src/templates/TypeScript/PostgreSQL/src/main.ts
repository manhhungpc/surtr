import express from 'express';
import { appConfig } from './config/app';
import cors from 'cors';
import { corsOptions } from './utils/cors';
import * as swaggerUiExpress from 'swagger-ui-express';
import { getMetadataArgsStorage, useExpressServer } from 'routing-controllers';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { fixModuleAlias } from './utils/module-alias';
import { pgPool } from './config/db';
import 'reflect-metadata';
fixModuleAlias(__dirname);

export class App {
    private app: express.Application = express();
    private PORT: Number = appConfig.port;
    public constructor() {
        this.init();
    }

    public async init() {
        await this.mongooseConnect();
        this.setupMiddleware();
        this.registerController();
        this.startServer();
        this.registerDefaultHomePage();
        this.setupSwagger();
        this.register404Page();
    }

    private startServer() {
        this.app.listen(this.PORT, () => {
            console.log(
                `🚀 Server started at http://localhost:${this.PORT} \n🚨️ Environment: ${process.env.NODE_ENV}`,
            );
        });
    }

    private async mongooseConnect() {
        try {
            await pgPool.initialize();
            console.log('Connect to TypeORM is successful!');
        } catch (error) {
            console.log('Caught! Cannot connect to postgres: ', error);
        }
    }

    public setupMiddleware() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cors(corsOptions));
    }

    private registerController() {
        useExpressServer(this.app, {
            validation: { stopAtFirstError: true },
            classTransformer: true,
            defaultErrorHandler: false,
            routePrefix: appConfig.routePrefix,
            controllers: [__dirname + appConfig.controllersDir],
            middlewares: [__dirname + appConfig.middlewaresDir],
        });
    }

    private registerDefaultHomePage() {
        this.app.get('/', (req, res) => {
            res.json({
                title: appConfig.name,
                mode: appConfig.node,
            });
        });
    }

    private register404Page() {
        this.app.get('*', function (req, res) {
            res.status(404).send({ status: 404, message: 'Page Not Found!' });
        });
    }

    private setupSwagger() {
        // Parse class-validator classes into JSON Schema
        const schemas = validationMetadatasToSchemas({
            refPointerPrefix: '#/components/schemas/',
        });

        // Parse routing-controllers classes into OpenAPI spec:
        const storage = getMetadataArgsStorage();
        const spec = routingControllersToSpec(
            storage,
            { routePrefix: appConfig.routePrefix },
            {
                components: {
                    //@ts-ignore
                    schemas,
                    securitySchemes: {
                        bearerAuth: {
                            type: 'http',
                            scheme: 'bearer',
                            bearerFormat: 'JWT',
                        },
                    },
                },
                info: {
                    description: 'Welcome to API Documentation!',
                    title: 'API Documentation',
                    version: '1.0.0',
                },
            },
        );

        // Use Swagger
        this.app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
    }
}

new App();
