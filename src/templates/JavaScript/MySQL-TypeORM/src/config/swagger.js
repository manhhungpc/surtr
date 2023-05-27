import swaggerJsDoc from 'swagger-jsdoc';
import { appConfig } from './app';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.1',
        info: {
            version: '1.0.0',
            title: 'API Document',
            description: 'CargoKwik Backend API',
            servers: [`http://${appConfig.host}:${appConfig.port}`],
        },
        servers: [{ url: '/api/v1' }],
        schemes: ['http'],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;
