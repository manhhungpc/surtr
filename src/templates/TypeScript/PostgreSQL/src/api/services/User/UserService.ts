import { UserNotFoundException } from '@base/api/exceptions/UserNotFoundException';
import { User } from '@base/api/models/User';
import { UserRequest } from '@base/api/requests/UserRequest';
import { AuthCheck } from '@base/infrastructure/middlewares/AuthCheck';
import { paginate } from '@base/utils/helpers';
import { UseBefore } from 'routing-controllers';
import { Service } from 'typedi';
import { pgPool } from '@base/config/db';
import { Like } from 'typeorm';

@Service()
@UseBefore(AuthCheck)
export class UserService {
    UserRepo = pgPool.getRepository(User);
    constructor() {
        //
    }

    public async getAll(request: UserRequest) {
        const per_page = request.limit;
        const current_page = request.page;
        let query: any = {};

        if (request.q) {
            query.where = [{ username: Like(`%${request.q}%`) }, { name: Like(`%${request.q}%`) }];
        }
        const user = await this.UserRepo.find(query);
        const total = await this.UserRepo.countBy(query);

        // or "throw new BadRequestError(MsgError.USER_NOT_FOUND)"
        if (!user) throw new UserNotFoundException();

        return paginate(user, total, per_page, current_page);
    }
}
