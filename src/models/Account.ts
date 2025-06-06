import { Schema, model, Document, Types } from 'mongoose';

export interface IAccount extends Document {
  user: Types.ObjectId;
  balance: number;
}

const AccountSchema = new Schema<IAccount>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, default: 0 },
});

export default model<IAccount>('Account', AccountSchema);
