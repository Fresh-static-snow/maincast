import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenService } from 'src/modules/token/token.service';
import { refreshStrategyName } from '../constants/jwt';

@Injectable()
export class RefreshTokenGuard
  extends AuthGuard(refreshStrategyName)
  implements CanActivate
{
  constructor(
    @Inject(TokenService) private readonly _tokenService: TokenService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request?.cookies?.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const payload = await this._tokenService.validateRefreshToken(refreshToken);

    if (!payload) {
      throw new UnauthorizedException();
    }

    request.user = payload;
    return true;
  }
}
