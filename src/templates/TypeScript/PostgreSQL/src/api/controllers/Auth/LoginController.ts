import { Service } from 'typedi';
import { OpenAPI } from 'routing-controllers-openapi';
import { Body, Get, JsonController } from 'routing-controllers';
import { LoginRequest } from '@base/api/requests/LoginRequest';
import { LoginService } from '@base/api/services/Auth/LoginService';

@Service()
@OpenAPI({
    tags: ['Auth'],
})
@JsonController('/v1/auth')
export class AuthController {
    public constructor(private loginService: LoginService) {}

    @Get('/login')
    public async index(@Body() request: LoginRequest) {
        return await this.loginService.login(request);
    }
}
