
import { ApiProperty } from "@nestjs/swagger";
import { Model, Column, DataType, Table, BelongsToMany } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.modul";


interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;


    @ApiProperty({example: 'user@gmail.com', description: 'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;


    @ApiProperty({example: 'docs123_Com', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;


    @ApiProperty({example: 'true', description: 'Забанен или нет'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;


    @ApiProperty({example: 'За спам', description: 'Причина блакировки'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;


    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

}

