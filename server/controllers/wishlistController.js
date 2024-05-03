import Wishlist from "../models/wishlistModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import mongoose, { isValidObjectId } from "mongoose";

export const toogleWishlist = asyncHandler(async(req,res)  => {
     
        const { userId, productId } = req.body;
  
        if (!isValidObjectId(productId)) {
          res.status(401);
          throw new Error('Not authorized, Invalid product ID');
        }
      
        try {
          const wishlist = await Wishlist.findOne({ user:userId, products: productId });
      
          if (wishlist) {
            await Wishlist.findByIdAndUpdate(wishlist._id, { $pull: { products: productId } });
          } else {
            // Handle the case when the wishlist doesn't exist
            // You may add logic here if needed
            await Wishlist.findOneAndUpdate(
                { user:userId },
                { $push: { products: productId } },
                { upsert: true }
              );
          }
          res.status(200).json({message:'success'})
       } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error('Internal server errpr',error)
      }
})


export const getWishlistItems = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;
  const pageSize = 8;

  
  try {
    const wishlist = await Wishlist.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user._id) } },
      {
        $lookup: {
          from: 'products',
          localField: 'products',
          foreignField: '_id',
          as: 'products',
        },
      },
      { $unwind: '$products' },
      {
        $group: {
          _id: '$_id',
          user: { $first: '$user' },
          products: { $push: '$products' },
          productIds: { $push: '$products._id' }, // Add product IDs
          totalProducts: { $sum: 1 }, // Count total products
        },
      },
      {
        $sort: { 'products.createdAt': -1 } // Assuming there is a 'createdAt' field in the 'products' array
      },
      {
        $project: {
          _id: 0,
          user: 1,
          products: {
            $slice: ['$products', (page - 1) * pageSize, pageSize]
          },
          productIds: 1, // Include product IDs
          totalProducts: 1,
        },
      },
    ]);
 // lookup group unwind project
    const totalProductsCount = wishlist[0]?.totalProducts;
    const totalPages = Math.ceil(totalProductsCount / pageSize);

    res.status(200).json({
      page,
      pages: totalPages,
      wishlist: wishlist[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
