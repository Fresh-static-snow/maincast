import { Module } from '@nestjs/common';
import { CookieModule } from '../cookie/cookie.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenModule } from '../token/token.module';
import { AuthSeed } from './seed/auth.seed';

@Module({
  imports: [CookieModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, AuthSeed],
  exports: [AuthService, AuthSeed],
})
export class AuthModule {}
