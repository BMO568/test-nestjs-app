import {
    AllowNull,
    AutoIncrement,
    Column,
    Model,
    PrimaryKey,
    Table,
    Unique,
} from "sequelize-typescript";

@Table
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    firstName: string;

    @Column
    lastName?: string;

    @Column
    age?: number;

    @Unique
    @Column
    phoneNumber?: string;

    @Unique
    @Column
    email?: string;

    @Column({
        values: ["male", "female"],
    })
    gender?: "male" | "female";

    @AllowNull(false)
    @Column
    password: string;
}
