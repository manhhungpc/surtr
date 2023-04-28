import { UserRequest } from '@base/api/requests/UserRequest';
import { Service } from 'typedi';

@Service()
export class UserService {
    constructor() {
        //
    }

    public async getAll(request: UserRequest) {}
}
