import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [
        {
            name: { type: String, },
            price: { type: Number, },
            quantity: { type: Number, },
            sizeState: { type: String},     
            extras: {
                type: [
                  {
                    text: { type: String, required: true },
                    price: { type: Number, required: true },
                  },
                ],
              },
            images: [ {type: Object,}] ,
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
           
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["processing","out for delivery","delivered"],
        required: true
    },
    shippingAddress: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        address: { type: String, required: true },
        phoneNumber: { type: String, required: true},
    },
    deliveredAt: {
        type: Date,
    },


}, {timestamps: true})
const Order = mongoose.models.Order || mongoose.model('Order',OrderSchema)
export default Order;