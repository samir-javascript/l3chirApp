import { z } from "zod"
 
export const RegisterValidation = z.object({
  username: z.string().min(2).max(50),
  email : z.string().email(),
  password: z.string().min(6, {message: "Password must contain at least 6 character(s)"})
})
export const AuthValidation = z.object({
    email : z.string().email(),
    password: z.string().min(6,{message: "Password must contain at least 6 character(s)"})
  })