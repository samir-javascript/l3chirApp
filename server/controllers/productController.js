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
           const result = await Promise.all(images.map(async (image) => {
             const result = await cloudinary.uploader.upload(image, {
              upload_preset: 'l3chir',
              transformation: [
                {crop: "scale"},
                {quality: "auto"},
                {fetch_format: "auto"},
              ]
             });
             return result.secure_url;
           }));
          
          if(type !== "food") {
            const product = await Product.create({
                 name,
                 price,
                 description,
                 type,
                 prevPrice,
                 images:result,
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
export const getProducts = asyncHandler( async(req,res)=> {
  const page = Number(req.query.pageNumber) || 1;
  const pageSize = 12;
  const skipAmount = pageSize * (page - 1)

   
      const count = await Product.countDocuments()
        const products = await Product.find({})
        .limit(pageSize)
        .skip(skipAmount)
        .sort({createdAt: -1})
        res.status(200).json({products,page, count,pages:Math.ceil(count / pageSize)})
   
})
export const updateProduct = asyncHandler (async(req,res)=>  {
   
        const { name, description, category, price, productId, prevPrice, images} = req.body;
        const product = await Product.findById(productId)
        if(product) {
           
                const result = await Promise.all(images.map(async(image)=> {
                    const res = await cloudinary.uploader.upload(image, {
                        upload_preset: "l3chir",
                        transformation: [
                            {crop: "scale"},
                            {quality: "auto"},
                            {fetch_format: "auto"},
                          ]
                    })
                    return res.secure_url
                }))
            
            product.name = name;
            product.description = description;
            product.price = price;
            product.prevPrice = prevPrice;
            product.category = category;
            product.images = result || product.images;
           const updatedProduct = await product.save()
           res.status(200).json(updatedProduct)
        }else {
            res.status(404)
            throw new Error('Product not found')
        }

    
})

export const getProductById = asyncHandler (async(req,res)=> {
  
         const product = await Product.findById(req.params.id)
         if(!product) {
            res.status(404)
            throw new Error('Product not found')
         }
         res.status(200).json(product)
   
})

export const deleteProduct = asyncHandler (async(req,res)=> {
  const { productId} = req.body;
    
        const product = await Product.findById(productId)
        if(product) {
            await Product.findByIdAndDelete(product._id)
            res.status(200).json({message: "product has been deleted"})
        }else {
          res.status(404)
          throw new Error('Product not found')
        }
       
    
})

export const getProductsByCategory = asyncHandler( async(req,res)=> {
  const { categoryName} = req.params;
 
      const products = await Product.find({category: categoryName})
      res.status(200).json(products)
  
})


export const createReview = asyncHandler (async(req,res)=> {
  
    const { comment, rating,productId} = req.body;
    const product = await Product.findById(productId)
    const isAlreadyReviewed = product.reviews.find(item => item.user.toString() === req.user._id.toString())
    if(isAlreadyReviewed) {
      res.status(400)
      throw new Error("you're not allowed to review a product more than one")
    }
    const review = {
      name: req.user.name,
      user: req.user._id,
      comment,
      rating
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc,review)=> acc + review.rating, 0) / product.reviews.length;
    await product.save()
    res.status(201).json({message: "product review added"})
  
})


//  {text: text, price: extraOptionPrice} 


// get product stats
// admin only
// GET REQUEST
// ROUTE: /getProducts/stats

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