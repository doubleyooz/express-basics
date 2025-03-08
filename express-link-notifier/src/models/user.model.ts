import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
    email: string;
    password: string;
    name: string;
    tokenVersion: number;
}

export interface IUserDocument extends IUser, Document { }

export type CreateUserDto = Omit<IUser, 'tokenVersion'>;

export type FindByIdUserDto = Omit<IUser, 'password' | 'name' | 'email' | 'tokenVersion'>;

export type FindAllUsersDto = Partial<Omit<IUser, '_id' | 'password' | 'tokenVersion'>>;

export type UpdateUserDto = Partial<Omit<IUser, '_id' | 'email' | 'tokenVersion'>>;

export const USER = 'User'

const UserSchema: Schema = new Schema(
    {
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true, select: false },
        name: { type: String, required: true },
        tokenVersion: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model<IUserDocument>(USER, UserSchema);
