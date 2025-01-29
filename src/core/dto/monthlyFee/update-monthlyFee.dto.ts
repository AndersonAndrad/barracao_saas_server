import { CreateMonthlyFeeDto } from './create-monthlyFee.dto';

export class UpdateMonthlyFeeDto implements Partial<Omit<CreateMonthlyFeeDto, 'userId'>> { }
