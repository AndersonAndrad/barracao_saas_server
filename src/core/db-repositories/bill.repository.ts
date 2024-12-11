import { CrudTemplate } from '../../shared/templates/crud.template';
import { Bill } from '../interfaces/bill.interface';

export interface BillRepository extends CrudTemplate<Bill> {}
