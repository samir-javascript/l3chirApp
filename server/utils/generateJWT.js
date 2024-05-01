import jwt from 'jsonwebtoken'

export const generateToken =(userId,res)=> {
   const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d"
   })
   res.cookie("restaurantJWT",token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60 * 1000

   })
}