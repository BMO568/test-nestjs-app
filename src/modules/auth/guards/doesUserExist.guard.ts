import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "../../user/user.service";

@Injectable()
export class DoesUserExist implements CanActivate {
    constructor(private readonly userService: UserService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request) {
        let userExist =
            request.body.email && (await this.userService.findOneByEmail(request.body.email));
        if (userExist) {
            throw new ForbiddenException("This email already exists");
        }
        userExist =
            request.body.phoneNumber &&
            (await this.userService.findOneByPhoneNumber(request.body.phoneNumber));
        if (userExist) {
            throw new ForbiddenException("This phone number already exists");
        }
        return true;
    }
}
