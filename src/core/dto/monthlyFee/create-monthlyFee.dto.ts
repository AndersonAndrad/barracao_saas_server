import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { CreateMonthlyFee } from '@app/core/interfaces/monthlyFee.interface';

export class CreateMonthlyFeeDto implements CreateMonthlyFee {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Monthly fee due date' })
  dueDate: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Monthly fee amount' })
  amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Montlhy fee notes' })
  notes?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Monthly fee user' })
  userId: string;
}
