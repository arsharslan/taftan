import mongoose, { Document, Schema, Model, models, model } from 'mongoose';

// Define an interface for the Dessert document
export interface IDish extends Document {
    _id: string | null;
    name: string;
    price: number;
    description?: string;
    min_order: number;
    quantity: {
        name: string;
        quantity: number;
        unit: string;
    }[];
    is_available: boolean;
    is_bestseller: boolean;
    image?: string | null;
    category: 'Mutton Dishes' | 'Chicken Dishes' | 'Beef Dishes' | 'Starters' | 'Ready to Cook' | 'Desserts';
}

// Define the schema
const DessertSchema: Schema<IDish> = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        description: {
            type: String,
            trim: true,
        },
        min_order: {
            type: Number,
            required: true,
            min: 1,
        },
        quantity: [
            {
                quantity: {
                    type: Number,
                    required: true,
                    min: 0,
                },
                unit: {
                    type: String,
                    required: true,
                },
            },
        ],
        is_available: {
            type: Boolean,
            default: true,
        },
        is_bestseller: {
            type: Boolean,
            default: false,
        },
        image: {
            type: String,
            default: null,
        },
        category: {
            type: String,
            required: true,
            enum: ['Mutton Dishes', 'Chicken Dishes', 'Beef Dishes', 'Starters', 'Ready to Cook', 'Desserts'],
        },
    },
    { timestamps: true } // Add createdAt and updatedAt fields
);

// Create the model
const Dessert: Model<IDish> = models.Dessert || model<IDish>('Dish', DessertSchema);

export default Dessert;