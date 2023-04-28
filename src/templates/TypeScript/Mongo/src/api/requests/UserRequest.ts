import { IsOptional, IsString } from 'class-validator';

export class UserRequest {
    @IsOptional()
    request1: number;

    @IsOptional()
    @IsString()
    request2: number = 1;
}
