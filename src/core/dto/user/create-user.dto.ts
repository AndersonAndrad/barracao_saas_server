import { User } from '../../interfaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto implements Omit<User, '_id' | 'status'> {
  @ApiProperty({ description: 'User email', example: 'email@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User name display for others', example: 'User name' })
  @IsString()
  @Length(3, 255)
  name: string;

  @ApiProperty({ description: 'User password - Min length: 8, Max length: 128' })
  @IsString()
  @Length(8, 128)
  password: string;

  @ApiProperty({ description: 'Confirmation password - Min length: 8, Max length: 128' })
  @IsString()
  @Length(8, 128)
  confirmPassword: string;

  @ApiProperty({ description: 'User alias', example: 'MyUserName' })
  @IsString()
  alias: string;

  @ApiProperty({ description: 'User birthday', example: new Date() })
  @IsDate()
  @Type(() => Date)
  birthday: Date;

  @ApiProperty({ description: 'User name phone', example: '99 99999-9999' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'base64 with image content' })
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty({ description: 'Color in hex', example: '#ffffff' })
  @IsString()
  @IsOptional()
  color: string;
}
