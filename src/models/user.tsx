import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
    _id?: string
    firebase_id: string;
    first_name: string;
    last_name?: string;
    profile_pic?: string;
    phone_number: string;
    email?: string;
    // gmail?: string;
    created_at?: Date;
    is_admin?: boolean
}

// Define the schema
const userSchema = new Schema<IUser>({
    firebase_id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String },
    profile_pic: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    // gmail: { type: String, required: false, unique: true },
    phone_number: { type: String, required: true, unique: true },
    created_at: { type: Date, default: Date.now },
});

// Prevent model overwrite during development
const User = models.User || model<IUser>('User', userSchema);

export default User;
