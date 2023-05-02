import { Service } from 'typedi';
import { OpenAPI } from 'routing-controllers-openapi';
import { Get, JsonController, QueryParams } from 'routing-controllers';
import { UserService } from '@base/api/services/User/UserService';
import { UserRequest } from '@base/api/requests/UserRequest';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';

@Service()
@OpenAPI({
    security: [{ bearerAuth: [] }],
    tags: ['User'],
})
@JsonController('/v1/users')
export class UserController extends ControllerBase {
    public constructor(private userService: UserService) {
        super();
    }

    @Get()
    public async index(@QueryParams() request: UserRequest) {
        return await this.userService.getAll(request);
    }
}
