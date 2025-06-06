import { Schema, model, Document } from 'mongoose';

export interface IRewardCampaign extends Document {
  name: string;
  rewardRate: number;
}

const RewardCampaignSchema = new Schema<IRewardCampaign>({
  name: { type: String, required: true },
  rewardRate: { type: Number, required: true },
});

export default model<IRewardCampaign>('RewardCampaign', RewardCampaignSchema);
