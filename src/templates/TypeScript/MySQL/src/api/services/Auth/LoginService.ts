import { User } from '@base/api/models/User';
import { LoginRequest } from '@base/api/requests/LoginRequest';
import { MsgError } from '@base/utils/msg-error';
import { BadRequestError, InternalServerError } from 'routing-controllers';
import { Service } from 'typedi';
import { dataSource } from '@base/config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { appConfig } from '@base/config/app';

@Service()
export class LoginService {
    UserRepo = dataSource.getRepository(User);
    constructor() {
        //
    }

    public async login(request: LoginRequest) {
        const user = await this.UserRepo.findOneBy({ username: request.username });
        const isCorrectPwd = await bcrypt.compare(request.password, user.password);
        if (!isCorrectPwd) throw new BadRequestError(MsgError.INVALID_CREDENTIALS);

        const payload = { name: user.name, username: user.username };
        jwt.sign(payload, appConfig.jwtSecret, { expiresIn: appConfig.jwtExpires }, (err, accessToken) => {
            if (err) throw new InternalServerError(MsgError.INTERNAL_SERVER_ERROR);
            return accessToken;
        });
    }
}
