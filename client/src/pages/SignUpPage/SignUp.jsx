
import logo from "@/assets/logol3chir2.jpg"
import AuthModel from "@/components/models/AuthModel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import loader from "@/assets/loader.gif"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { useRegisterUserMutation } from "@/slices/UsersApiSlice"
import { setCredentials } from "@/slices/usersSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
    const [registerPassword,setRegisterPassword] = useState('')
    const [username,setUserName] = useState('')
    const [registerEmail,setRegisterEmail] = useState("")
    const navigate = useNavigate()
    const  [confirmPassword,setConfirmPassword] = useState("")
    const dispatch = useDispatch()
    const [open,setOpen] = useState(false)
    const [Register, {isLoading:loading}] = useRegisterUserMutation()
    const handleSubmit = async(e)=> {
        e.preventDefault()
  if(registerPassword !== confirmPassword) {
     toast({
      title: "passwords must match",
      variant:"destructive"
     })
     return;
  }
    try {
       const res = await Register({
         username,
         email: registerEmail,
         password: registerPassword
       })
       if(res.error) {
        toast({
          title: "Failed to register",
          variant:"destructive"
         })
         return;
       }
       console.log(res.data, "res from sign up")
       dispatch(setCredentials({...res.data}))
     
        navigate('/') 
       toast({
        title: "Registered successfuly",
       })
    } catch (error) {
      console.log(error)
    }
    }
  return (
    <div className="w-full h-full flex items-center justify-center py-10 relative bg-white">
          <div className="max-w-[1400px] mx-auto ">
                <div className="flex lg:items-center items-start lg:flex-row flex-col w-full gap-[2rem] lg:gap-[5rem] ">
                     <div>
                          <img className="max-lg:w-[180px] " src={logo} alt="l3chir" />
                     </div>
                     <div className="flex flex-col max-lg:max-w-[400px] w-full gap-2">
                           <h2 className="text-black font-bold text-[28px] lg:text-[35px] capitalize leading-[2] ">Sign up to continue using <br /> l3chir food app delivery</h2>
                           <div className="shadow-md rounded-[15px] w-full p-5 ">
                                <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
                                     <div className="flex w-full flex-col gap-2">
                                         <Label>Full Name</Label>
                                         <Input value={username} onChange={(e)=> setUserName(e.target.value)} disabled={loading} className="bg-gray-100 w-full" type="text" />
                                     </div>
                                     <div className="flex flex-col gap-2">
                                         <Label>Email Address</Label>
                                         <Input value={registerEmail} onChange={(e)=> setRegisterEmail(e.target.value)} disabled={loading} className="bg-gray-100" type="email" />
                                     </div>
                                     <div className="flex flex-col gap-2">
                                         <Label>Password</Label>
                                         <Input value={registerPassword} onChange={(e)=> setRegisterPassword(e.target.value)} disabled={loading} className="bg-gray-100" type="password" />
                                     </div>
                                     <div className="flex flex-col gap-2">
                                         <Label>Confirm Password</Label>
                                         <Input value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} disabled={loading} className="bg-gray-100" type="password" />
                                     </div>
                                     <Button disabled={loading} type="submit" className="bg-[#0aafaa] text-white rounded-[10px] " >
                                        {loading ?  <img src={loader} alt="loading..." className="w-[35px] h-[35px] " />  : "Sign Up"} 
                                     </Button>

                                </form>
                                <div className="flex mt-10 w-full items-start flex-col gap-3">
                                     <p className="font-semibold text-[#222] text-base  ">Already have an account?</p>
                                     <Button disabled={loading} onClick={()=> setOpen(true)} className="bg-transparent font-semibold text-[18px] text-[#00afaa] border w-full rounded-[10px]  " type="button">Login</Button>
                                </div>
                           </div>
                     </div>
                </div>
          </div>
          <AuthModel signupPage open={open} setOpen={setOpen} />
    </div>
  )
}

export default SignUp