import { User } from '@base/api/models/User';
import { LoginRequest } from '@base/api/requests/LoginRequest';
import { MsgError } from '@base/utils/msg-error';
import { BadRequestError } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
export class LoginService {
    constructor() {
        //
    }

    public async login(request: LoginRequest) {
        const user = await User.findOne({ password: request.password }).lean();
        if (!user) throw new BadRequestError(MsgError.INVALID_USER);

        return user;
    }
}
