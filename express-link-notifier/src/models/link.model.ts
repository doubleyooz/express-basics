import mongoose, { Schema, Document } from "mongoose";

export interface ILink extends Document {
    name: string;
}

export const LINK = 'Link'

const LinkSchema: Schema = new Schema(
    {
        name: { type: String, unique: true, required: true },

    },
    { timestamps: true }
);

export default mongoose.model<ILink>(LINK, LinkSchema);
