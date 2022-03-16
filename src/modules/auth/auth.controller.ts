import { Controller, Body, Post, UseGuards, ForbiddenException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserDto } from "../user/dto/user.dto";
import { AuthService } from "./auth.service";
import { UserCredentialsDto } from "./dto/userCredentials.dto";
import { DoesUserExist } from "./guards/doesUserExist.guard";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard("local"))
    @Post("login")
    async login(@Body() user: UserCredentialsDto) {
        return await this.authService.login(user);
    }

    @UseGuards(DoesUserExist)
    @Post("signup")
    async signUp(@Body() user: UserDto) {
        if (!user.phoneNumber && !user.email) {
            throw new ForbiddenException("User must have an email or phone number");
        }
        return await this.authService.addNewUser(user);
    }
}
