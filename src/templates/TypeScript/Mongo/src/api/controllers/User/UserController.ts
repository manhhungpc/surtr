import { Service } from 'typedi';
import { OpenAPI } from 'routing-controllers-openapi';
import { Get, JsonController, QueryParams } from 'routing-controllers';
import { UserService } from '@base/api/services/User/UserService';
import { UserRequest } from '@base/api/requests/UserRequest';

@Service()
@OpenAPI({
    security: [{ bearerAuth: [] }],
    tags: ['Auth'],
})
@JsonController('/v1/users')
export class UserController {
    public constructor(private userService: UserService) {}

    @Get()
    public async index(@QueryParams() request: UserRequest) {
        return await this.userService.getAll(request);
    }
}
