import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // localhost:3000/auth/signup
    @Post('signup')
    signup(@Body(ValidationPipe) authcredentialDto: AuthCredentialDto): Promise<void> {
        return this.authService.signUp(authcredentialDto);
    }
}
