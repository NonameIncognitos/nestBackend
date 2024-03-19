
import { ApiProperty } from "@nestjs/swagger";
import { Model, Column, DataType, Table, BelongsToMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.modul";
import { User } from "src/users/users.model";


interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
    image: string
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;


    @ApiProperty({example: 'user@gmail.com', description: 'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;


    @ApiProperty({example: 'docs123_Com', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    content: string;


    @Column({type: DataType.STRING})
    image: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    author: User

    
}

