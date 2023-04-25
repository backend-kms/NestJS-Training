import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // localhost:3000/auth/signup
    @Post('signup')
    signup(@Body(ValidationPipe) authcredentialDto: AuthCredentialDto): Promise<void> {
        return this.authService.signUp(authcredentialDto);
    }

    @Post('signin')
    signin(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialDto);
    }

    // @Post('/test')
    // // 인증에 대한 미들웨어 처리, 토큰이 없거나 잘못된 경우 Unauth 나옴
    // @UseGuards(AuthGuard())
    // test(@Req() req) {
    //     console.log('req', req);
    // }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log('user', user);

    }
}
