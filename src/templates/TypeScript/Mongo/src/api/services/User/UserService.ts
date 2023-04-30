import { LoggedUserInterface } from '@base/api/interfaces/LoggedUserInterface';
import { User } from '@base/api/models/User';
import { UserRequest } from '@base/api/requests/UserRequest';
import { LoggedUser } from '@base/decorators/LoggedUser';
import { AuthCheck } from '@base/infrastructure/middlewares/AuthCheck';
import { UseBefore } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@UseBefore(AuthCheck)
export class UserService {
    constructor() {
        //
    }

    public async getAll(request: UserRequest) {
        const user = await User.find({}).limit(request.limit).lean();

        return user;
    }
}
