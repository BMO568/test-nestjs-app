import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UserDto } from "../user/dto/user.dto";
import { User } from "../user/user.model";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { UserCredentialsDto } from "./dto/userCredentials.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(userIdentifier: string, pass: string): Promise<User> {
        let user =
            (await this.userService.findOneByEmail(userIdentifier)) ||
            (await this.userService.findOneByPhoneNumber(userIdentifier));
        if (!user) {
            return null;
        }

        const match = await this.comparePassword(pass, user.password);
        if (!match) {
            return null;
        }

        return user;
    }

    public async login(user: UserCredentialsDto) {
        const token = await this.generateToken(user.userIdentifier);
        return { user, token };
    }

    public async addNewUser(user: UserDto) {
        const pass = await this.hashPassword(user.password);

        const newUser = await this.userService.create({ ...user, password: pass });

        const { password, ...result } = newUser["dataValues"];

        const token = await this.generateToken(newUser.email || newUser.phoneNumber);

        return { user: result, token };
    }

    private async generateToken(userIdentifier: string) {
        const token = await this.jwtService.signAsync({ userIdentifier });
        return token;
    }

    private async hashPassword(password: string) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    private async comparePassword(enteredPassword: string, dbPassword: string) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
}
