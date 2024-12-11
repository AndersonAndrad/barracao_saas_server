import { IsArray, IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BillStatus, PaymentMethod } from '../../interfaces/bill.interface';

class PersonaDetailsDto {
  @ApiProperty({ description: 'Name of the person' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Contact information of the person' })
  @IsOptional()
  @IsString()
  contact?: string;

  @ApiPropertyOptional({ description: 'Address of the person' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'Document information of the person' })
  @IsOptional()
  @IsString()
  document?: string;
}

class PaymentDto {
  @ApiProperty({ description: 'Unique identifier for the payment' })
  @IsString()
  paymentId: string;

  @ApiProperty({ description: 'Amount paid' })
  @IsNumber()
  amountPaid: number;

  @ApiProperty({ description: 'Date of payment' })
  @IsDate()
  @Type(() => Date)
  datePaid: Date;

  @ApiProperty({ description: 'Payment method', enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  method: PaymentMethod;
}

export class CreateBillDto {
  @ApiProperty({ description: 'Bill or invoice number' })
  @IsString()
  billNumber: string;

  @ApiProperty({ description: 'Date by which payment should be made' })
  @IsDate()
  @Type(() => Date)
  dueDate: Date;

  @ApiProperty({ description: 'Status of the bill', enum: BillStatus })
  @IsEnum(BillStatus)
  status: BillStatus;

  @ApiProperty({ description: 'Category of the bill' })
  @IsString()
  category: string;

  @ApiPropertyOptional({ description: 'Details of the payer' })
  @IsOptional()
  @ValidateNested()
  @Type(() => PersonaDetailsDto)
  payerDetails?: PersonaDetailsDto;

  @ApiPropertyOptional({ description: 'Details of the payee' })
  @IsOptional()
  @ValidateNested()
  @Type(() => PersonaDetailsDto)
  payeeDetails?: PersonaDetailsDto;

  @ApiProperty({ description: 'Total amount to be paid' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Currency code (e.g., USD, EUR)' })
  @IsString()
  currency: string;

  @ApiPropertyOptional({ description: 'Applicable taxes on the bill' })
  @IsOptional()
  @IsNumber()
  tax?: number;

  @ApiPropertyOptional({ description: 'Discounts applied to the bill' })
  @IsOptional()
  @IsNumber()
  discount?: number;

  @ApiProperty({ description: 'Final amount after tax and discount' })
  @IsNumber()
  totalAmount: number;

  @ApiPropertyOptional({ description: 'Payment terms (e.g., Net 30, Net 60)' })
  @IsOptional()
  @IsString()
  paymentTerms?: string;

  @ApiPropertyOptional({ description: 'Payment method', enum: PaymentMethod })
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;

  @ApiPropertyOptional({ description: 'Optional notes or comments' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ description: 'Array of payment records', type: [PaymentDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentDto)
  payments?: PaymentDto[];

  @ApiPropertyOptional({ description: 'Remaining balance to be paid' })
  @IsOptional()
  @IsNumber()
  balanceDue?: number;

  @ApiPropertyOptional({ description: 'Amount overpaid, if applicable' })
  @IsOptional()
  @IsNumber()
  overpayment?: number;

  @ApiPropertyOptional({ description: 'Array of attachment URLs or file paths' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments?: string[];

  @ApiPropertyOptional({ description: 'External reference or transaction number' })
  @IsOptional()
  @IsString()
  referenceNumber?: string;
}
