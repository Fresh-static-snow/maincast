import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StoreCreateDto } from './store.dto';
import { Response } from 'express';
import { StoreService } from './store.service';
import { MessageResponse } from 'src/common/utils/response';
import { successMessage } from 'src/common/constants/response';

@ApiTags('store')
@Controller('store')
export class StoreController {
  constructor(private readonly _storeService: StoreService) {}

  @ApiBody({
    type: StoreCreateDto,
  })
  @ApiOkResponse({
    schema: { example: new MessageResponse(successMessage) },
    type: MessageResponse,
  })
  @Post()
  async create(@Body() body: StoreCreateDto, @Res() res: Response) {
    await this._storeService.create(body);

    res.status(HttpStatus.OK).json(new MessageResponse(successMessage));
  }
}
