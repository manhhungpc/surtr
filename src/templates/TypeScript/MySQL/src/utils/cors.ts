import cors from 'cors';

/**
 * For more configuration options, see: https://github.com/expressjs/cors#configuration-options
 * Current config below will enable ALL CORS request
 */
export const corsOptions: cors.CorsOptions = {
    origin: true,
};
