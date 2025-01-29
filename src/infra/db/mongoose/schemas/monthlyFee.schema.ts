import { MonthlyFee, MonthlyFeeStatus } from '@app/core/interfaces/monthlyFee.interface';
import { Schema, model } from 'mongoose';

const MonthlyFeeSchema = new Schema<MonthlyFee>(
  {
    code: { type: String, required: true },
    user: { type: Schema.Types.Mixed, required: true },
    dueDate: { type: Date, required: true },
    paymentDate: { type: Date },
    amount: { type: Number, required: true },
    amountPaid: { type: Number },
    differenceAmount: { type: Number },
    status: { type: String, enum: Object.values(MonthlyFeeStatus), required: true },
    processedBy: { type: Schema.Types.Mixed },
    bill: { type: Schema.Types.Mixed },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    notes: { type: String },
  },
  { timestamps: true },
);

export const MonthlyFeeModel = model<MonthlyFee>('monthlyFee', MonthlyFeeSchema);
