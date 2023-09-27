import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { successMessage } from 'src/common/constants/response';
import { MessageResponse } from 'src/common/utils/response';
import { TransactionsService } from './transactions.service';
import { TransactionsDto } from './transacttions.dto';
import { Response } from 'express';
import { AccessTokenGuard } from 'src/common/guards/access.guard';
import { AccessLevel, RolesGuard } from 'src/common/guards/roles.guard';
import { RoleAccess } from 'src/common/types/enums';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly _transactionsService: TransactionsService) {}

  @ApiBody({
    type: TransactionsDto,
  })
  @ApiOkResponse({
    schema: { example: new MessageResponse(successMessage) },
    type: MessageResponse,
  })
  @ApiBearerAuth()
  @AccessLevel(RoleAccess.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post('deposit')
  async deposit(@Body() body: TransactionsDto, @Res() res: Response) {
    await this._transactionsService.addToBalance(body);
    res.status(HttpStatus.OK).json(new MessageResponse(successMessage));
  }

  @ApiBody({
    type: TransactionsDto,
  })
  @ApiOkResponse({
    schema: { example: new MessageResponse(successMessage) },
    type: MessageResponse,
  })
  @ApiBearerAuth()
  @AccessLevel(RoleAccess.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post('withdraw')
  async withdraw(@Body() body: TransactionsDto, @Res() res: Response) {
    await this._transactionsService.removeFromBalance(body);
    res.status(HttpStatus.OK).json(new MessageResponse(successMessage));
  }
}
