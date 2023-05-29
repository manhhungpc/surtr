import { UserNotFoundException } from '@base/api/exceptions/UserNotFoundException';
import { LoggedUserInterface } from '@base/api/interfaces/LoggedUserInterface';
import { User } from '@base/api/models/User';
import { UserRequest } from '@base/api/requests/UserRequest';
import { dataSource } from '@base/config/db';
import { LoggedUser } from '@base/decorators/LoggedUser';
import { AuthCheck } from '@base/infrastructure/middlewares/AuthCheck';
import { paginate } from '@base/utils/helpers';
import { UseBefore } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@UseBefore(AuthCheck)
export class UserService {
    UserRepo = dataSource.getRepository(User);

    constructor() {
        //
    }

    public async getAll(request: UserRequest) {
        const user = await this.UserRepo.find();
        const per_page = request.limit;
        const current_page = request.page;
        if (!user) throw new UserNotFoundException();

        const total = await this.UserRepo.count();

        return paginate(user, total, per_page, current_page);
    }
}
