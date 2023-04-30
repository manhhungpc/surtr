import { Schema, model, Document } from 'mongoose';

// 1. create interface
export interface IUser extends Document {
    username: string;
    password: string;
    name: string;
    bod: string;
    phone: string;
    telegram: string;
    avatar: string;
    created_at: Date;
    updated_at: Date;
}

// 2. create schema
const UserSchema: Schema = new Schema(
    {
        username: { type: String },
        password: { type: String },
        name: { type: String },
        bod: { type: String },
        bio: { type: String },
        phone: { type: String },
        telegram: { type: String },

        avatar: { type: String },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        collection: 'users',
    },
);

// 3. create model
export const User = model<IUser>('User', UserSchema);
