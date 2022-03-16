import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UserIdDto {
    @ApiProperty()
    readonly userId: number;
}
