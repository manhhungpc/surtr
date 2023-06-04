import { User } from '@base/api/models/User';
import { pgPool } from '@base/config/db';
import { LoginRequest } from '@base/api/requests/LoginRequest';
import { MsgError } from '@base/utils/msg-error';
import { BadRequestError } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
export class LoginService {
    UserRepo = pgPool.getRepository(User);
    constructor() {
        //
    }

    public async login(request: LoginRequest) {
        const user = await this.UserRepo.findOneBy({ username: request.username });
        if (!user) throw new BadRequestError(MsgError.USER_NOT_FOUND);

        return user;
    }
}
