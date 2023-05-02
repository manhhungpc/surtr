import { IsOptional, IsString } from 'class-validator';

export class UserRequest {
    @IsOptional()
    limit: number = 10;

    @IsOptional()
    @IsString()
    page: number = 1;
}
