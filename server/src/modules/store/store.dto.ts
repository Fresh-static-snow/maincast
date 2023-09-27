import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class StoreCreateDto {
  @ApiProperty()
  @IsString()
  name: string;
}
