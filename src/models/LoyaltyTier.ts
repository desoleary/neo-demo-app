import { Schema, model, Document } from 'mongoose';

export interface ILoyaltyTier extends Document {
  name: string;
  threshold: number;
}

const LoyaltyTierSchema = new Schema<ILoyaltyTier>({
  name: { type: String, required: true },
  threshold: { type: Number, required: true },
});

export default model<ILoyaltyTier>('LoyaltyTier', LoyaltyTierSchema);
