import { Schema, model, Document, Types } from 'mongoose';

export interface ITransaction extends Document {
  account: Types.ObjectId;
  merchant: Types.ObjectId;
  amount: number;
  rewardsEarned: number;
}

const TransactionSchema = new Schema<ITransaction>({
  account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  merchant: { type: Schema.Types.ObjectId, ref: 'Merchant', required: true },
  amount: { type: Number, required: true },
  rewardsEarned: { type: Number, default: 0 },
});

export default model<ITransaction>('Transaction', TransactionSchema);
