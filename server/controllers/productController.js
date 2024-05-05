import asyncHandler from "../middlewares/asyncHandler.js";
import OverallStat from "../models/overallStatsModel.js";
import Product from "../models/productModel.js";
import cloudinary from "../utils/cloudinary.js";
export const createProduct = asyncHandler (async (req,res)=>  {
    
      const { name,  description, smallPrice, type, price, mediumPrice, largePrice,
        prevPrice, category, 
       } = req.body;
         const images = req.body.images || [];
        
           // Use Promise.all to handle multiple image uploads concurrently
          
           const result = await Promise.all(images.map(async(image)=> {
            const { secure_url, public_id } = await uploadImageToCloudinary(image);
            return { secure_url, public_id };
           }))
          
          if(type !== "food") {
            const product = await Product.create({
                 name,
                 price,
                 description,
                 type,
                 prevPrice,
                 images: result,
                 category
              })
              if(!product) {
                throw new Error('Failed to create a new product')
              }
              res.status(201).json({
                _id: product._id,
                name: product.name,
               
                description: product.description,
                prevPrice: product.prevPrice,
               
                price: product.price,
                images: product.images,
               
                category: product.category,
              })
          }else {
           const product = await Product.create({
              name,
             
              description,
              prices: [
               { size: "small", price: smallPrice },
               { size: "medium", price: mediumPrice },
               { size: "large", price: largePrice }
             ],
             extraOptions: [
              
                 
   { text: "Double Fromage", price: 8 },
   { text: "Sauce Algereinne P", price: 2 },
   { text: "Fromage Cheddar" , price: 2},
   { text: "Jambon" , price: 10},
   { text: "Sauce Biggy P", price: 2},
   { text: "Sauce Pita kebab P", price: 3},
   { text: "Pepsi 50cl" , price: 10},
   { text: "Mirinda Pomme 50cl" , price: 10},
   { text: "COCA COLA Maxi" , price: 10},
   { text: "Fanta Citron Canette", price: 6},
   { text: "haway Citron Canette", price: 10}
   
   
             ],
              prevPrice,
              
              images: result,
             
              category,
             
            
              
            })
            if(!product) {
              throw new Error('Failed to create a new product')
            }
            res.status(201).json({
              _id: product._id,
              name: product.name,
             
              description: product.description,
              prevPrice: product.prevPrice,
             
              price: product.price,
              images: product.images,
             
              category: product.category,
            })
          }
         
         
         
         
       
    
 })
 async function uploadImageToCloudinary(image) {
  const result = await cloudinary.uploader.upload(image, {
    upload_preset: 'l3chir',
    transformation: [
      { crop: 'scale' },
      { quality: 'auto' },
      { fetch_format: 'auto' },
    ],
  });
  return { secure_url: result.secure_url, public_id: result.public_id };
}
export const getProducts = asyncHandler( async(req,res)=> {
  const page = Number(req.query.pageNumber) || 1;
  const pageSize = 12;
  const skipAmount = pageSize * (page - 1)

   
      const count = await Product.countDocuments()
        const products = await Product.find({})

        .limit(pageSize)
        .skip(skipAmount)
       
        res.status(200).json({products,page, count,pages:Math.ceil(count / pageSize)})
   
})
// export const updateProduct = asyncHandler (async(req,res)=>  {
   
//         const { name, description, category, price, productId, prevPrice, images} = req.body;
//         const product = await Product.findById(productId)
//         if(product) {
                
//                 const result = await Promise.all(images.map(async(image)=> {
//                     const res = await cloudinary.uploader.upload(image, {
//                         upload_preset: "l3chir",
//                         transformation: [
//                             {crop: "scale"},
//                             {quality: "auto"},
//                             {fetch_format: "auto"},
//                           ]
//                     })
//                     return res
//                 }))
            
//             product.name = name;
//             product.description = description;
//             product.price = price;
//             product.prevPrice = prevPrice;
//             product.category = category;
//             product.images = result || product.images;
//            const updatedProduct = await product.save()
//            res.status(200).json(updatedProduct)
//         }else {
//             res.status(404)
//             throw new Error('Product not found')
//         }

    
// })
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, category, price, productId, prevPrice, images } = req.body;
  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // If images are provided in the request body, upload them to Cloudinary and update the product
  if (images && images.length > 0) {
    // Upload new images to Cloudinary
    const uploadedImages = await Promise.all(images.map(async (image) => {
      const res = await cloudinary.uploader.upload(image, {
        upload_preset: "l3chir",
        transformation: [
          { crop: "scale" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ]
      });
    
      // Extract only public_id and secure_url from the response
      const { public_id, secure_url } = res;
      return { public_id, secure_url };
    }));

    // Delete old images from Cloudinary
    if(product && product.images && images) {
      const oldImagePublicIds = product.images.map(img => img.public_id);
      const result = await cloudinary.api.delete_resources(oldImagePublicIds);
      console.log(result,"delete result")
    }
    

    // Update product with new images
    product.images = uploadedImages;
  }

  // Update other product fields
  product.name = name;
  product.description = description;
  product.price = price;
  product.prevPrice = prevPrice;
  product.category = category;

  // Save the updated product
  const updatedProduct = await product.save();
  res.status(200).json(updatedProduct);
});

export const getProductById = asyncHandler (async(req,res)=> {
  
         const product = await Product.findById(req.params.id).populate("reviews.user")
         if(!product) {
            res.status(404)
            throw new Error('Product not found')
         }
         res.status(200).json(product)
   
})

export const deleteProduct = asyncHandler(async (req, res) => {
  const { productId} = req.body;

  const product = await Product.findById(productId);
  if (product) {
      // Delete the product from the database
      await Promise.all(
        product.images.map(async (image) => {
          try {
          
           
         
            const result = await cloudinary.uploader.destroy(image.public_id);
            console.log(result); // Log the result of image deletion if needed
          } catch (error) {
            console.error(`Error deleting image: ${error.message}`);
          }
        })
      );
      await Product.findByIdAndDelete(product._id);

      res.status(200).json({message: 'product was deleted successfuly'})
     
  } else {
      res.status(404);
      throw new Error('Product not found');
  }
});



export const getProductsByCategory = asyncHandler( async(req,res)=> {
  const { categoryName} = req.params;
 
      const products = await Product.find({category: categoryName})
      res.status(200).json(products)
  
})


export const createReview = asyncHandler (async(req,res)=> {
  
    const { comment, rating,productId, userId, username} = req.body;
    const product = await Product.findById(productId)
    const isAlreadyReviewed = product.reviews.find(item => item.user.toString() === req.user._id.toString())
    if(isAlreadyReviewed) {
      res.status(400)
      throw new Error("you're not allowed to review a product more than one time")
    }
    const review = {
      name: username,
      user: userId,
      comment,
      rating
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc,review)=> acc + review.rating, 0) / product.reviews.length;
    await product.save()
    res.status(201).json({message: "product review added"})
  
})

export const getRecommendedProducts = asyncHandler(async(req,res)=> {
  try {
    const product = await Product.findById(req.params.id)
    if(!product) {
      res.status(404)
      throw new Error('Product not found')
    }
    const products = await Product.find({
       category: product.category,
       _id: {$ne: product._id}
    })
        res.status(200).json(products)
  } catch (error) {
    console.log(error)
  }
})

export const getStats = asyncHandler (async(req,res)=> {
 
    const stats = await OverallStat.find({})
    if(stats) {
      res.status(200).json(stats[0])
    }
  
}

)
// download in client folder

// 1 - @nivo/pie
// 2 - @nivo/line
// 3 - recharts