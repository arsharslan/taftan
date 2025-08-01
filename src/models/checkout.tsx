import { DishSelected } from '@/app/online-order/[id]/page';
import mongoose, { Document, Schema, Model, model, models } from 'mongoose';
import { AddressSchema, IAddress } from './address';
import { PaymentMode } from '@/app/online-order/[id]/components/final';
import { IUser } from './user';

export interface ICheckout {
    _id?: string | null;
    user_id?: mongoose.Schema.Types.ObjectId | string | IUser;
    items?: DishSelected[],
    address?: IAddress,
    requested_delivery_date?: Date,
    payment_mode?: PaymentMode,
    createdAt?: string,
    delivery_charges?: number;
    sub_total?: number;
    gst?: number;
    total?: number;
    is_paid?: boolean;
}

const DishSelectedSchema = new mongoose.Schema({
    dish_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
    quantity: { type: Number, required: true },
});

// Define the schema
const CheckoutSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    items: { type: [DishSelectedSchema], required: true },
    address: { type: AddressSchema, required: false },
    requested_delivery_date: { type: Date, required: false },
    payment_mode: {
        type: String,
        enum: ['ONLINE', 'CONTACT'],
        required: false,
    },
    delivery_charges: { type: Number, required: false },
    is_paid: { type: Boolean, required: true, default: false },
    /* sub_total: { type: Number, required: false },
    gst: { type: Number, required: false },
    total: { type: Number, required: false } */
}, { timestamps: true });

// Create the model
const Checkout: Model<ICheckout> = models.Checkout || model<ICheckout>('Checkout', CheckoutSchema);

export default Checkout;