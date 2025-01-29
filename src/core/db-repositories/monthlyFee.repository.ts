import { MonthlyFee, MonthlyFeePayment } from '../interfaces/monthlyFee.interface';

import { CrudTemplate } from '@app/shared/templates/crud.template';

export interface MonthlyFeeRepository extends CrudTemplate<MonthlyFee> {
  monthlyFeePayment(props: MonthlyFeePayment): Promise<void>;
}
