import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User name (up to 32 characters)' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(32, { message: 'Username is too long' })
  username: string;

  @ApiProperty({ description: 'Phone number (up to 10 characters)' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(10, { message: 'Phone number is too long' })
  phone: string;

  @ApiProperty({
    description: 'Password (must include 6-12 characters, uppercase letter, and special character)',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,12})/, {
    message: 'Password must include 6-12 characters, uppercase letter, and special character',
  })
  password: string;
}