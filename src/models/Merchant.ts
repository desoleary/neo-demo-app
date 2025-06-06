import { Schema, model, Document } from 'mongoose';

export interface IMerchant extends Document {
  name: string;
}

const MerchantSchema = new Schema<IMerchant>({
  name: { type: String, required: true },
});

export default model<IMerchant>('Merchant', MerchantSchema);
