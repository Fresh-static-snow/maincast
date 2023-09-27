import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { successMessage } from 'src/common/constants/response';
import { MessageResponse } from 'src/common/utils/response';
import { CurrecyGetDto } from './currency.dto';
import { CurrencyService } from './currency.service';

@ApiTags('currency')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly _currencyService: CurrencyService) {}

  @Get()
  async get(@Query() query: CurrecyGetDto, @Res() res: Response) {
    const data = await this._currencyService.get(query.take, query.skip);

    res.status(HttpStatus.OK).json(new MessageResponse(successMessage, data));
  }
}
