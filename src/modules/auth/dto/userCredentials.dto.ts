import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    MinLength,
    isPhoneNumber,
    ValidatorConstraintInterface,
    ValidatorConstraint,
    ValidationArguments,
    isEmail,
    Validate,
} from "class-validator";

@ValidatorConstraint()
class IsPhoneNumbeOrEmail implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        return isEmail(value) || isPhoneNumber(value);
    }
}

export class UserCredentialsDto {
    @Validate(IsPhoneNumbeOrEmail)
    @ApiProperty()
    readonly userIdentifier: string;

    @ApiProperty()
    @MinLength(6)
    @IsNotEmpty()
    readonly password: string;
}
