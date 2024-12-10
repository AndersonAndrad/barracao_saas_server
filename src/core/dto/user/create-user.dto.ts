import { User } from '../../interfaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto implements Omit<User, '_id'> {
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
}
