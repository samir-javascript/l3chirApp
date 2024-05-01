import jwt from "jsonwebtoken"
import User from "../models/userModel.js";
export const protect = async(req,res,next)=> {
    let token;
    token = req.cookies.restaurantJWT
    if(token) {
        try {
          
               const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
               req.user = await User.findById(decoded.userId).select('-password')
               next()
            
        } catch (error) {
            console.log(error)
            res.status(401)
        throw new Error('not authorized, token failed')

        }
    }else {
        res.status(401)
        throw new Error('not authorized, no token')
    }
    
}


export const admin  = (req,res,next)=> {
  try {
     if(req.user && req.user.isAdmin) {
         next()
     }else {
        res.status(401)
        throw new Error('Not authorized as admin')
     }
  } catch (error) {
    console.log(error)
  }
}