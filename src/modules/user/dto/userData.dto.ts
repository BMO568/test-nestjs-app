import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";
import { UserDto } from "./user.dto";

export class UserDataDto extends PartialType(UserDto) {
    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    readonly id: number;
}
