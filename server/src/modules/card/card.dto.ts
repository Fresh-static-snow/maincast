import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';
import { CardType } from '@prisma/client';
import { PaginationDto } from 'src/common/types/dto';

export class CardCreateDto {
  @ApiProperty()
  @IsUUID()
  currencyId: string;

  @ApiProperty()
  @IsNumber()
  storeId: number;

  @ApiProperty()
  @IsString()
  type: CardType;
}

export class CardDeleteDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}

export class CardGetDto extends PaginationDto {}
