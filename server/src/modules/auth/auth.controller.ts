import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CookieConfig } from 'src/common/config/cookie.config';
import { successMessage } from 'src/common/constants/response';
import { RefreshTokenGuard } from 'src/common/guards/refresh.guard';
import { ConfigNames } from 'src/common/types/configNames';
import { GuardedRequest, MessageResponse } from 'src/common/utils/response';
import { CookieService } from '../cookie/cookie.service';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly _cookieConfig: CookieConfig;
  constructor(
    private readonly _cookieService: CookieService,
    private readonly _configService: ConfigService,
    private readonly _authService: AuthService,
  ) {
    const config = this._configService.getOrThrow<CookieConfig>(
      ConfigNames.COOKIES,
    );
    this._cookieConfig = config;
  }

  @ApiBody({
    type: AuthDto,
    examples: {
      email: {
        value: {
          email: 'example@mail.com',
          password: 'Moovy123',
        },
      },
    },
  })
  @ApiOkResponse({
    schema: { example: new MessageResponse('Success', { accessToken: '' }) },
    type: MessageResponse,
  })
  @Post('register')
  async register(@Body() body: AuthDto, @Res() res: Response) {
    const {
      tokens: { accessToken, refreshToken },
    } = await this._authService.register(body);

    res = this._cookieService.setCookie(res, refreshToken);

    res
      .status(HttpStatus.OK)
      .json(new MessageResponse('Success', { accessToken }));
  }

  @ApiBody({
    type: AuthDto,
    examples: {
      email: {
        value: {
          email: 'example@mail.com',
          password: 'Moovy123',
        },
      },
    },
  })
  @ApiOkResponse({
    schema: { example: new MessageResponse('Success', { accessToken: '' }) },
    type: MessageResponse,
  })
  @Post('login')
  async login(@Body() body: AuthDto, @Res() res: Response) {
    const {
      tokens: { accessToken, refreshToken },
    } = await this._authService.login(body);

    res = this._cookieService.setCookie(res, refreshToken);

    res
      .status(HttpStatus.OK)
      .json(new MessageResponse(successMessage, { accessToken }));
  }

  @ApiOkResponse({
    schema: { example: new MessageResponse('Success', { accessToken: '' }) },
    type: MessageResponse,
  })
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refresh(@Req() req: GuardedRequest, @Res() res: Response) {
    const {
      tokens: { accessToken },
    } = await this._authService.refresh(req.user);

    res
      .status(HttpStatus.OK)
      .json(new MessageResponse(successMessage, { accessToken }));
  }

  @ApiOkResponse({
    schema: { example: new MessageResponse('Success') },
    type: MessageResponse,
  })
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const refreshToken: string | undefined =
      req.cookies[this._cookieConfig.refreshCookieName];

    if (refreshToken) {
      this._authService.logout(refreshToken);
    }

    res = this._cookieService.removeCookie(res);
    res.status(HttpStatus.OK).json(new MessageResponse(successMessage));
  }
}
