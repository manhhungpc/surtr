import { User } from '@base/api/models/User';
import { LoginRequest } from '@base/api/requests/LoginRequest';
import { MsgError } from '@base/utils/msg-error';
import { BadRequestError, InternalServerError } from 'routing-controllers';
import { Service } from 'typedi';
import { appConfig } from '@base/config/app';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

@Service()
export class LoginService {
    constructor() {
        //
    }

    public async login(request: LoginRequest) {
        const user = await User.findOne({ password: request.password }).lean();
        const isCorrectPwd = await bcrypt.compare(request.password, user.password);
        if (!isCorrectPwd) throw new BadRequestError(MsgError.INVALID_CREDENTIALS);

        const payload = { name: user.name, username: user.username };
        jwt.sign(payload, appConfig.jwtSecret, { expiresIn: appConfig.jwtExpires }, (err, accessToken) => {
            if (err) throw new InternalServerError(MsgError.INTERNAL_SERVER_ERROR);
            return accessToken;
        });
    }
}
