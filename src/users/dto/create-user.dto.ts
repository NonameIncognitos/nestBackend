import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class createUserDto {

    @ApiProperty({ example: 'user@gmail.com', description: 'Почта' })
    @IsString({ message: 'Должно быть строкой' })
    @IsEmail({},{message: "Неккоректный email"})
    readonly email: string;

    @ApiProperty({ example: 'docs123_Com', description: 'Пароль' })
    @IsString({ message: 'Должно быть строкой' })
    @Length(5, 32, {message: 'не меньше 4 и не больше 32 символов'})
        readonly password: string;

}