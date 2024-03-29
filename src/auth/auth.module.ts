import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule , JwtService} from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        
       forwardRef(() => UsersModule), 
        
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || "SECRET",
            signOptions: {
                expiresIn: '24h'
            }
        })

    ],

    exports: [
        AuthService, 
        JwtModule
    ]
})
export class AuthModule { }
