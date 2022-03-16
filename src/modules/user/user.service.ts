import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { PaginationDto } from "./dto/pagination.dto";
import { UserDto } from "./dto/user.dto";
import { UserDataDto } from "./dto/userData.dto";
import { User } from "./user.model";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {}

    async prepareForPublic(...users: User[]) {
        return users.map((u) => {
            const { password, ...result } = u["dataValues"];
            return result;
        });
    }

    async findAll(pagination?: PaginationDto): Promise<User[]> {
        if (pagination.take || pagination.skip) {
            const take = pagination.take || 5;
            const skip = pagination.skip || 0;
            const { rows } = await this.userModel.findAndCountAll<User>({
                limit: take,
                offset: skip,
            });
            return rows;
        }
        return this.userModel.findAll<User>();
    }

    async create(user: UserDto): Promise<User> {
        return await this.userModel.create<User>({ ...user });
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userModel.findOne<User>({ where: { email } });
    }

    async findOneByPhoneNumber(phoneNumber: string): Promise<User> {
        return await this.userModel.findOne<User>({ where: { phoneNumber } });
    }

    async findOneById(id: number): Promise<User> {
        return await this.userModel.findOne<User>({ where: { id } });
    }

    async findOneByPhoneNumberOrEmail(userIdentifier: string): Promise<User> {
        return await this.userModel.findOne<User>({
            where: { [Op.or]: [{ email: userIdentifier }, { phoneNumber: userIdentifier }] },
        });
    }

    async deleteById(id: number): Promise<number> {
        return await this.userModel.destroy({ where: { id } });
    }

    async update(user: UserDataDto): Promise<User[]> {
        const { id, ...userData } = user;
        const [numberOfAffectedRows, updatedUsers] = await this.userModel.update(
            { ...userData },
            { where: { id }, returning: true },
        );

        return updatedUsers;
    }

    async findAdultUsers(): Promise<User[]> {
        return this.userModel.findAll<User>({
            where: {
                age: { [Op.gte]: 18 },
            },
        });
    }
}
