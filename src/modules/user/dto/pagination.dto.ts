import { ApiPropertyOptional } from "@nestjs/swagger";

export class PaginationDto {
    @ApiPropertyOptional()
    readonly take?: number;
    @ApiPropertyOptional()
    readonly skip?: number;
}
