import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Max,
    Min,
    MinLength,
} from "class-validator";

enum Gender {
    MALE = "male",
    FEMALE = "female",
}

export class UserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly firstName: string;

    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    readonly password: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    readonly lastName?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(130)
    @ApiPropertyOptional()
    readonly age?: number;

    @IsOptional()
    @IsEmail()
    @ApiPropertyOptional()
    readonly email?: string;

    @IsOptional()
    @IsPhoneNumber()
    @ApiPropertyOptional()
    readonly phoneNumber?: string;

    @IsOptional()
    @IsEnum(Gender, {
        message: "gender must be either male or female",
    })
    @ApiPropertyOptional()
    readonly gender?: string;
}
