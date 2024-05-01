import User from "../models/userModel.js";
import Product from "../models/productModel.js"
import Order from "../models/orderModel.js"
import Token from "../models/tokenModel.js";
import { generateToken } from "../utils/generateJWT.js";
import crypto from "crypto"
import { sendResetMail } from "../utils/nodemailer.js";
import { isValidObjectId } from "mongoose";
import cloudinary from "../utils/cloudinary.js"
import asyncHandler from "../middlewares/asyncHandler.js";
// Route: /auth
// method: POST
// public route
 export const authUser = asyncHandler ( async(req,res)=> {
     
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if(!user) {
            res.status(400)
            throw new Error('Invalid email or password')
        }
        if(user && (await user.matchPassword(password))) {
             generateToken(user._id, res)
             res.status(200).json({
                _id: user._id,
                username: user.username,
                isAdmin: user.isAdmin,
                picture: user.picture,
                email: user.email,
             })
        
     } 
 })

export const changePassword = asyncHandler (async(req,res)=> {
  
      const { oldPassword, newPassword} = req.body;
      const user = await User.findById(req.user._id)
      if(!user) {
         res.status(404)
         throw new Error('User not found')
      }else if(user && (await user.matchPassword(oldPassword))) {
          user.password = newPassword;
          await user.save()
          res.status(200).json({message: "password has been changed"})
      }else {
// The new password must differ (in length) from your previous password.
         throw new Error('Your old password is incorrect.')
      }
       
   
})

export const addToWishlist = asyncHandler (async(req,res)=> {
    const { productId } = req.body;
   
      const user = await User.findById(req.user._id)
      if(!user) {
         res.status(404)
         throw new Error('User not found')
      }
      const isAlreadyWishListed = user.saved.includes(productId);
      if(isAlreadyWishListed) {
         await User.findByIdAndUpdate(user._id, {  $pull:{saved: productId}})
         res.status(200).json({message: "product has been removed from wishlist"})
      }else {
         await User.findByIdAndUpdate(user._id, {  $addToSet:{saved: productId}})
         res.status(200).json({message: "product has been added to wishlist"})
      }
     
   
})

export const getWishlistProducts = asyncHandler( async(req,res)=> {
  
      const user = await User.findById(req.user._id)
      const page = Number(req.query.pageNumber)|| 1;
      const pageSize = 10;
      const skipAmount = pageSize * (page - 1)
      const total = await Product.countDocuments({_id: {$in: user.saved}})
     
      const wishlistProducts = await Product.find({_id: {$in: user.saved}})
      .limit(pageSize)
      .skip(skipAmount)
      res.status(200).json({wishlistProducts,page,pages:Math.ceil(total / pageSize)})
    
   
})







 // Route: /register
// method: POST
// public route
export const registerUser =  asyncHandler (async(req,res)=> {
    const {username, email,password} = req.body;
    
        const userExists = await User.findOne({email})
        if(userExists) {
            throw new Error('User already exists!')
           }
           const user = await User.create({
           
            username,
            password,
            email,
           
            
        })
        if(user) {
            generateToken(user._id,res)
           
          
            res.status(200).json({
                _id: user._id,
                picture: user.picture,
                isAdmin: user.isAdmin,
              
                username: user.username,
                email: user.email,
              
               
                saved: user.saved
            })
        }else {
           res.status(401)
           throw new Error('Invalid credentials')
        }
    } )
// Route: /
// method: POST
// public route
export const logOutUser = asyncHandler( async(req,res)=> {
   
        res.clearCookie('restaurantJWT');
       res.status(200).json({message: "user has been logged out successfuly"})
   
})
// Route: /reset_password?token="dfdfd5454545"&user="some_id"
// method: POST
// public route

// Route: /verify_token
// method: POST
// public route
export const verifyToken = asyncHandler( async(req,res)=> {
  
       const { email } = req.body;
       const user = await User.findOne({email})
       if(!user) {
        res.status(404)
        throw new Error('User not found')
       }
       await Token.findOneAndDelete({user: user._id})
       let token = await Token.create({
          user: user._id,
          token: crypto.randomBytes(32).toString("hex")
       })
       const resetLink  = `${process.env.VITE_BASE_URL}/reset_password?token=${token.token}&user=${user._id}&email=${email}`
       await sendResetMail(user.email,"Password reset for 3chir account", resetLink)
       res.status(200).json(

        {
             message: "check out your inbox. we sent you an email to reset your password." ,
             email: user.email
            
        })

   
})

export const verifyPasswordReseyToken = asyncHandler( async(req,res)=>  {
  
         const { token, user:userId, password} = req.body;
         if(!isValidObjectId(userId))  {
             throw new Error('Invalid USER ID')
         }
         if(!token) {
            throw new Error('Invalid token')
         }
         const user = await User.findById(userId)
         if(!user) {
            res.status(404)
            throw new Error('User not found')
         }
         const tk = await Token.findOne({user:user._id})
         if(!tk) {
            res.status(404)
            throw new Error('Token not found')
         }
         user.password = password;
         await user.save()
         await Token.findByIdAndDelete(tk._id)
         res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            picture: user.picture,
            isAdmin: user.isAdmin,
            saved: user.saved,
            message: "you have reset your password for l3chir account successfuly"
         })


   
})
// Route: /:id
// method: GET
// public route
export const getUserById = asyncHandler( async(req,res)=> {
   
       const user = await User.findById(req.params.id)
       res.status(200).json(user)
    
})
// Route: /profile
// method: GET
// private route
export const getCurrentUser = asyncHandler( async(req,res)=> {
   
   
       const user = await User.findById(req.user._id)
       if(!user) {
         res.status(404)
         throw new Error('User not found')
       }
       res.status(200).json(user)
   
})
// Route: /profile
// method: PUT
// private route
export const updateMyProfile = asyncHandler (async(req,res)=> {
    
       const { email, username, picture} = req.body;
       const user = await User.findById(req.user._id)
       if(!user) {
          res.status(404)
          throw new Error('User not found')
       }
       const result = await cloudinary.uploader.upload(picture , {
         upload_preset: 'l3chir',
              transformation: [
                {crop: "scale"},
                {quality: "auto"},
                {fetch_format: "auto"},
              ]
       })

       if(req.password) {
          user.password = req.password;
       }
       user.username = username || user.username;
       user.email = email || user.email;
       user.picture = result.secure_url;
       const updatedUser = await user.save()
       res.status(200).json(updatedUser)
   
})

export const updateImageProfile = asyncHandler( async(req,res)=> {
    
      const { picture } = req.body;
       const user = await User.findById(req.user._id)
       if(!user) {
         res.status(404)
         throw new Error('User not found')
       }
       user.picture = picture;
       const updatedUser = await user.save()
       res.status(200).json(updatedUser)
    
})
export const savePersonalData = asyncHandler (async(req,res)=> {
 
      const { phoneNumber, firstName, lastName} = req.body;
      const user = await User.findById(req.user._id)
      if(!user) {
         res.status(404)
         throw new Error('User not found')
      }
      user.phoneNumber = phoneNumber;
      user.firstName = firstName;
      user.lastName = lastName;
      const updatedUser = await user.save()
      res.status(200).json(updatedUser)
   
})
// Route: /delete_user/:id
// method: DELETE
// private route for admins only
export const deleteUser = asyncHandler( async(req,res)=> {
    const {userId} = req.body;
    
       const user = await User.findById(userId)
       
       if(user && !user.isAdmin) {
         await User.findByIdAndDelete(user._id)
         res.status(200).json({message: "user has been deleted successfuly"})
       }else {
         res.status(400)
          throw new Error('cannot delete admin users')
       }
       
   
})


// Route: /update_user-profile/admin/:id
// method: PUT
// private route for admins only
export const updateUsers = asyncHandler (async(req,res)=> {
   const  { userId,isAdmin, username , email} = req.body;
   
       const user = await User.findById(userId)
       if(!user) {
         res.status(404)
         throw new Error('No user found')
       }
       user.isAdmin = Boolean(isAdmin) || user.isAdmin;
       user.username = username  || user.username;
       user.email = email || user.email;
       const updatedUser = await user.save()
       res.status(200).json(updatedUser)
   
})
// Route: /all_users
// method: GET
// private route for admins only
export const getAllUsers = asyncHandler (async(req,res)=> {
    
      const page = Number(req.query.pageNumber) || 1;
      const pageSize = 12;
      const skipAmount = pageSize * (page - 1)
       const users = await User.find({})
       .limit(pageSize)
       .skip(skipAmount)
       
       const count = await User.countDocuments({isAdmin:false})
       res.status(200).json({users,count,page,pages:Math.ceil(count / pageSize) })
    
})





// we need to get users only who have orders ;
// GET REQUEST
// ROUTE: /users_with-orders
// admin only;

export const getUsersWithOrders = asyncHandler( async(req,res)=> {
  
      const userOrdersAggregate  = await Order.aggregate([
          {
            $group: {
               _id: "$user",
               totalAmountSpent: {$sum: "$totalPrice"}
            }
          }
      ])
      if(!userOrdersAggregate.length) {
         res.status(404)
         throw new Error('No user with orders found')
      }
   const userIdToAmountMap = new Map()
   userOrdersAggregate.forEach((result)=> {
        userIdToAmountMap.set(result._id.toString(), result.totalAmountSpent)
   })
   console.log( Array.from(userIdToAmountMap.keys()) )
    const usersIds = Array.from(userIdToAmountMap.keys()) 
    const usersWithOrders = await User.find({
      _id: {$in: usersIds}
    })

    const usersData = usersWithOrders.map((user)=> {
         const userId = user._id.toString()
         const totalAmountSpent = userIdToAmountMap.get(userId) || 0;
         return {
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                picture: user.picture,
                isAdmin: user.isAdmin
            },
            totalAmountSpent: totalAmountSpent
         }
    })
      
       return res.status(200).json(usersData)
  
}
)





// get active users by month;
// GET REQUEST;
// admin only
// ROUTE: /getActive_users/months

export const getMonthlyActiveUsers = asyncHandler (async(req,res)=> {
  
      const usersCountsByMonth = await User.aggregate([
         {
            $group: {
               _id: {$month: "$createdAt"},
               count: {$sum: 1}
            },
          
         },
         { $sort: { '_id': 1 } }
      ])
      res.status(200).json(usersCountsByMonth)
   
}
)