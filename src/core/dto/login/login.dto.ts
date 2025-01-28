import { ApiProperty } from '@nestjs/swagger';
import { UserLogin } from '@app/core/interfaces/user.interface';

export class LoginDto implements UserLogin {
  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'User password' })
  password: string;
}
