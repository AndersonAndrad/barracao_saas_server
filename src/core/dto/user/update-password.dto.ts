import { UpdatePassword } from '../../interfaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordDto implements UpdatePassword {
  @IsString()
  @ApiProperty({ description: 'Confirmation new password' })
  confirmationPassword: string;

  @IsString()
  @ApiProperty({ description: 'New password' })
  newPassword: string;

  @IsString()
  @ApiProperty({ description: 'Current user password' })
  password: string;
}
