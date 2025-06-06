import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  preferences?: Record<string, unknown>;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  preferences: { type: Schema.Types.Mixed },
});

export default model<IUser>('User', UserSchema);
