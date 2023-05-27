import jwt from 'jsonwebtoken';
import { appConfig } from '../../config/app';

/** @type {import("express").RequestHandler} */
export const AuthCheck = async (req, res, next) => {
    const header = req.headers.authorization; // Authorization: Bearer eyJ...
    const token = header.split(' ')[1];

    jwt.verify(token, appConfig.jwtSecret, (user) => {
        console.log(user);
    });
};
