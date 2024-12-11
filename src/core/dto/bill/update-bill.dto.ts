import { Bill } from '../../interfaces/bill.interface';

export class UpdateBillDto implements Partial<Omit<Bill, '_id'>> {}
