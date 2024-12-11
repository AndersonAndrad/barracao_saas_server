import mongoose from 'mongoose';
import {
  Bill,
  BillStatus,
  Payment,
  PaymentMethod,
  PersonaDetails,
} from '../../../../core/interfaces/bill.interface';

const PersonaDetailsSchema = new mongoose.Schema<Omit<PersonaDetails, '_id'>>({
  name: { type: String, required: true },
  contact: { type: String },
  address: { type: String },
});

const PaymentSchema = new mongoose.Schema<Omit<Payment, '_id'>>({
  paymentId: { type: String, required: true },
  amountPaid: { type: Number, required: true },
  datePaid: { type: Date, required: true },
  method: {
    type: String,
    enum: Object.values(PaymentMethod),
    required: true,
  },
});

const billSchema = new mongoose.Schema<Omit<Bill, '_id'>>(
  {
    billNumber: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: Object.values(BillStatus) },
    category: { type: String, required: true },
    payerDetails: { type: PersonaDetailsSchema, required: false },
    payeeDetails: { type: PersonaDetailsSchema, required: false },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    tax: { type: Number, required: false },
    discount: { type: Number, required: false },
    totalAmount: { type: Number, required: true },
    paymentTerms: { type: String, required: false },
    paymentMethod: { type: String, enum: Object.values(PaymentMethod), required: false },
    notes: { type: String, required: false },
    payments: { type: [PaymentSchema], required: false },
    balanceDue: { type: Number, required: false },
    overpayment: { type: Number, required: false },
    attachments: { type: [String], required: false },
    referenceNumber: { type: String, required: false },
  },
  { timestamps: true },
);

export const BillModel: mongoose.Model<Omit<Bill, '_id'>> = mongoose.model('Bill', billSchema);
