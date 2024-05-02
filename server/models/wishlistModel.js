import mongoose from "mongoose";
const WishlistSchema = new mongoose.Schema({
    user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User"
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    }],

}, {timestamps: true})
const Wishlist = mongoose.models.Wishlist || mongoose.model("Wishlist",WishlistSchema)
export default Wishlist