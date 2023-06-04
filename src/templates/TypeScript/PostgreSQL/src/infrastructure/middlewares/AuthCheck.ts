import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import * as jwt from 'jsonwebtoken';
import { appConfig } from '@base/config/app';
import { Response } from 'express';

@Service()
export class AuthCheck implements ExpressMiddlewareInterface {
    use(request: any, response: Response, next?: (err?: any) => any): any {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return response.status(401).send({ status: 403, message: 'Unauthorized!' });
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, appConfig.jwtSecret, (err: any, user: any) => {
            if (err) {
                return response.status(403).send({ status: 403, message: 'Forbidden!' });
            }

            request.loggedUser = user;
            next();
        });
    }
}
