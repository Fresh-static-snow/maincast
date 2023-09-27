import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';

export class AuthDto {
  @IsString()
  @MaxLength(16)
  @ApiProperty()
  password: string;

  @IsEmail()
  @ApiProperty()
  email: string;
}
