import mongoose from "mongoose"
const ShippingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },

}, {timestamps: true})

const Shipping = mongoose.models.Shipping || mongoose.model("Shipping", ShippingSchema)
export default Shipping;