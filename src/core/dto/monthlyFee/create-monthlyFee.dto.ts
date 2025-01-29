import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { CreateMonthlyFee } from '@app/core/interfaces/monthlyFee.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMonthlyFeeDto implements CreateMonthlyFee {
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ description: 'Monthly fee due date' })
  dueDate: Date;

  @IsNumber()
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
