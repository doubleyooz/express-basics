import mongoose, { Schema, Document } from "mongoose";
import { USER } from "../utils/constant.util";

export interface IUser extends Document {
  email: string;
  password: string;
  tokenVersion: number;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
    tokenVersion: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>(USER, UserSchema);
