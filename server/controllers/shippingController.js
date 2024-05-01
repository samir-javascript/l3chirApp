import asyncHandler from "../middlewares/asyncHandler.js";
import Shipping from "../models/shippingModel.js";
import Testimonials from "../models/testemoniolModel.js";

import User from '../models/userModel.js'
export const createShipping = asyncHandler( async(req,res)=> {
   
        const {  lastName, firstName, address, phoneNumber } = req.body;
         const shipping = await Shipping.create({
            lastName,
            firstName,
            address,
            user: req.user._id,
            phoneNumber
         })
          if(!shipping)  {
            throw new Error('Failed to create shipping')
          }
          res.status(201).json(shipping)
    
}
)
export const editShipping = asyncHandler (async(req,res)=> {
   
        const {phoneNumber,lastName,firstName,address} = req.body;
      
        const shipping = await Shipping.findOne({user: req.user._id})
        if(!shipping) {
            res.status(404)
            throw new Error('shipping not found')
        }
        
        shipping.phoneNumber = phoneNumber;
        shipping.lastName = lastName;
        shipping.firstName = firstName;
        shipping.address = address;
        const updatedShipping = await shipping.save()
        res.status(200).json(updatedShipping)

        
    
})


export const getShippingAddress = asyncHandler ( async(req,res)=> {
    
        const shipping = await Shipping.findOne({user: req.user._id})
        .populate({ path: "user", select: "-password"})
        if(!shipping) {
            res.status(404)
            throw new Error('Shipping address not found')
        }
        res.status(200).json(shipping)
   
} 
)
export const deleteShippingAddress = asyncHandler( async(req,res)=> {
  
        const shipping = await Shipping.findOne({user: req.user._id})
        if(shipping) {
            await Shipping.findByIdAndDelete(shipping._id)
            res.status(200).json({message: "shipping has been deleted"})
        }else {
            res.status(404)
            throw new Error('Shipping address not found')
        }
       
   
}
)
export const addTestimoniolReview = asyncHandler (async(req,res)=> {
   
        const { comment, rating} = req.body;
        const user = await User.findById(req.user._id)
        const isAlreadyReviewed = await Testimonials.findOne({user: req.user._id})
        if(isAlreadyReviewed) {
            throw new Error("you're allowed to share only one customer review!")
        }
        const testimonial = await Testimonials.create({
            user: user._id,
            name: user.username,
            comment,
            rating
        })
        if(!testimonial) {
            res.status(400)
            throw new Error('Failed to add testimoniol review')
        }
        res.status(201).json({message: "Review added"})
    
})

export const getTestimoniols = asyncHandler (async(req,res)=> {
    
        const testimonials = await Testimonials.find({})
        .populate("user")
        res.status(200).json(testimonials)
        
})