import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserRequest {
    @IsOptional()
    @IsNumber()
    limit: number = 10;

    @IsOptional()
    @IsString()
    page: number = 1;

    @IsString()
    @IsOptional()
    q: string;
}
