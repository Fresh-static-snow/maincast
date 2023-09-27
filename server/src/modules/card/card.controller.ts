import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { CardService } from './card.service';
import { CardCreateDto, CardDeleteDto, CardGetDto } from './card.dto';
import { GuardedRequest, MessageResponse } from 'src/common/utils/response';
import { successMessage } from 'src/common/constants/response';
import { AccessTokenGuard } from 'src/common/guards/access.guard';

@ApiTags('card')
@Controller('card')
export class CardController {
  constructor(private readonly _cardService: CardService) {}

  @ApiBody({
    type: CardCreateDto,
  })
  @ApiOkResponse({
    schema: { example: new MessageResponse(successMessage) },
    type: MessageResponse,
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post()
  async create(
    @Body() body: CardCreateDto,
    @Res() res: Response,
    @Req() req: GuardedRequest,
  ) {
    await this._cardService.create(body, req.user.id);

    res.status(HttpStatus.OK).json(new MessageResponse(successMessage));
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get()
  async get(
    @Query() query: CardGetDto,
    @Res() res: Response,
    @Req() req: GuardedRequest,
  ) {
    const data = await this._cardService.get(
      req.user.id,
      query.take,
      query.skip,
    );

    res.status(HttpStatus.OK).json(new MessageResponse(successMessage, data));
  }

  @ApiBody({
    type: CardDeleteDto,
  })
  @ApiOkResponse({
    schema: { example: new MessageResponse(successMessage) },
    type: MessageResponse,
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete()
  async delete(
    @Body() body: CardDeleteDto,
    @Res() res: Response,
    @Req() req: GuardedRequest,
  ) {
    await this._cardService.delete(body, req.user.id);

    res.status(HttpStatus.OK).json(new MessageResponse(successMessage));
  }
}
