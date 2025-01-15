import mongoose, { Document, Schema, Model, model, models } from 'mongoose';

// Define an interface for the Dessert document
export interface IAddress {
    _id?: string | null;
    user_id: mongoose.Schema.Types.ObjectId | string;
    name: string;
    street_address: string;
    city: string;
    state: string;
    landmark?: string;
    pin_code: number;
    phone_number: string;
    place_id: string;
    type: string;
    /* latitude: number;
    longitude: number; */
}

// Define the schema
export const AddressSchema: Schema<IAddress> = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        street_address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        landmark: { type: String },
        pin_code: { type: Number, required: true },
        phone_number: { type: String, required: true },
        place_id: { type: String, required: true },
        type: { type: String, required: true, enum: [
            "Home",
            "Work",
            "Hostel",
            "Other"
        ] }
        /* latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }, */
    },
    { timestamps: true }
);

// Create the model
const Address: Model<IAddress> = models.Address || model<IAddress>('Address', AddressSchema);

export default Address;