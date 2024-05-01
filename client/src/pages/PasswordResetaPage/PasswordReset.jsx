import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { useAuthUserMutation, useChangeForgotPasswordMutation } from "@/slices/UsersApiSlice"
import { setCredentials } from "@/slices/usersSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate}   from 'react-router-dom'

const PasswordReset = () => {
  const [updatePassword, {isLoading}] = useChangeForgotPasswordMutation()
   
   const { search } = useLocation()
   const searchParams = new URLSearchParams(search)
   const email = searchParams.get("email")
   const token = searchParams.get('token')
   const user = searchParams.get('user')
    const [newPassword,setNewPassword] = useState('')
    const [newPasswordConfirmation,setNewPasswordConfirmation] = useState("")
    const [auth] = useAuthUserMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleResetPassword = async(e)=> {
        e.preventDefault()
        if(newPassword !== newPasswordConfirmation) {
           toast({
            title: "passwords must match",
            variant: "destructive"
           })
           return;
        }
        try {
            const res = await updatePassword({
               token,
               user,
               password: newPassword
            })
            if(res.error) {
               toast({
                title: "something went wrong",
                variant: "destructive"
               })
               return
            }
            dispatch(setCredentials({...res.data}))
            await auth({
                email: res.data.email,
                password: newPassword
            })
            toast({
              title: "logged in successfuly"
            })
            navigate('/')
        } catch (error) {
             console.log(error)
        }
    }
  return (
    <div className="w-full h-full bg-white flex items-center justify-center">
    <div className="md:w-[800px] mx-[20px] w-[350px] rounded-[10px] my-20 border border-[#f5f5f5]  ">
          <Card className="!border-none">
          <CardHeader>
            <CardTitle className="text-left leading-[140%] text-black font-bold md:text-[22px] text-[18px] ">
               Password reset for the account: {email}
            </CardTitle>
            
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleResetPassword}>

           
            <div className="space-y-1">
              <Label htmlFor="new password">New Password</Label>
              <Input value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} className="rounded-[5px] bg-[#f5f5f5] outline-none placeholder:text-gray-500 " 
              type="password" id="new password"  />
            </div>
           
            <div className="space-y-1 mt-3">
              <Label  htmlFor="password">Password</Label>
              <Input value={newPasswordConfirmation} onChange={(e)=> setNewPasswordConfirmation(e.target.value)}  className="rounded-[5px] bg-[#f5f5f5] outline-none placeholder:text-gray-500 " type="password" id="password"  />
            </div>
            <Button type="submit" className="bg-[#0aafaa] mt-7 w-full transition-all duration-200
             text-white rounded-[5px] hover:bg-[#174d4b] " >
               {isLoading ? 'Loading...' : "Login"}  
             </Button>
            </form>
            
          </CardContent>
          
        </Card>
    </div>
    </div>
  )
}

export default PasswordReset