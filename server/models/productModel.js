import mongoose from "mongoose";
const PriceSchema = new mongoose.Schema({
   size: {
     type: String,
     enum: ["small", "medium", "large"], // Define the available sizes
   },
   price: {
     type: Number,
   }
 });
const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true
    },
    comment:  {
        type: String,
        required: true
    }
   
}, {timestamps: true})
const ProductSchema = new mongoose.Schema({
    name: {
       type: String,
       required: true
    },
    description: {
        type: String,
        required: true
     },
     category: {
        type: String,
        required: true
     },
   
   prices: [PriceSchema],
    extraOptions: {
      type: [
        {
          text: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
     prevPrice: {
        type: Number,
        required: true
     },
     images:[{
        type: Object,
        required: true
     }],
     numReviews: {
        type: Number,
        default: 0
     },
     rating: {
        type: Number,
        default: 0,
    },
    price: {
      type: Number,
    },
    type: {
       type: String,
       default: 'food'
    },
     reviews:  [reviewSchema],

})
const Product = mongoose.models.Product || mongoose.model("Product",ProductSchema)
export default Product
// position, product type brand 