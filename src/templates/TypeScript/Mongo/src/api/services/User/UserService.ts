import { UserNotFoundException } from '@base/api/exceptions/UserNotFoundException';
import { User } from '@base/api/models/User';
import { UserRequest } from '@base/api/requests/UserRequest';
import { AuthCheck } from '@base/infrastructure/middlewares/AuthCheck';
import { paginate } from '@base/utils/helpers';
import { UseBefore } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@UseBefore(AuthCheck)
export class UserService {
    constructor() {
        //
    }

    public async getAll(request: UserRequest) {
        const per_page = request.limit;
        const current_page = request.page;
        let query: any = {};

        if (request.q) {
            query.$or = [
                {
                    name: { $regex: request.q, $options: 'i' },
                },
                {
                    username: { $regex: request.q, $options: 'i' },
                },
            ];
        }
        const user = await User.find(query).limit(request.limit).lean();
        const total = await User.countDocuments(query);

        // or "throw new BadRequestError(MsgError.USER_NOT_FOUND)"
        if (!user) throw new UserNotFoundException();

        return paginate(user, total, per_page, current_page);
    }
}
