import { Body, Controller, Post, UseGuards, Type } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PaginationDto } from "./dto/pagination.dto";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";
import { UserDataDto } from "./dto/userData.dto";
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { UserIdDto } from "./dto/userId.dto";

@Controller("user")
export class UserController {
    constructor(private userService: UserService) {}
    @ApiBearerAuth("JWT")
    @ApiBody({ required: false, type: PaginationDto })
    @UseGuards(AuthGuard("jwt"))
    @Post("getAll")
    async getAll(@Body() pagination: PaginationDto) {
        return await this.userService.prepareForPublic(
            ...(await this.userService.findAll(pagination)),
        );
    }

    @ApiBearerAuth("JWT")
    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"))
    @Post("addUser")
    async addUser(@Body() user: UserDto) {
        return await this.userService.prepareForPublic(await this.userService.create(user));
    }

    @ApiBearerAuth("JWT")
    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"))
    @Post("deleteUser")
    async deleteUser(@Body() body: UserIdDto) {
        return await this.userService.deleteById(body.userId);
    }

    @ApiBearerAuth("JWT")
    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"))
    @Post("updateUser")
    async updateUser(@Body() userData: UserDataDto) {
        return await this.userService.prepareForPublic(
            ...(await this.userService.update(userData)),
        );
    }

    @ApiBearerAuth("JWT")
    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"))
    @Post("getAdultUsers")
    async getAdultUsers() {
        return await this.userService.prepareForPublic(
            ...(await this.userService.findAdultUsers()),
        );
    }
}
