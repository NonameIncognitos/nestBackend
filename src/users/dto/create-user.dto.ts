import { ApiProperty } from "@nestjs/swagger";

export class createUserDto {

    @ApiProperty({example: 'user@gmail.com', description: 'Почта'})
    readonly email: string;
    
    @ApiProperty({example: 'docs123_Com', description: 'Пароль'})
    readonly password: string;

}