 /* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
 
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
 
  
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import loader from '@/assets/loader.gif'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "../ui/button"
import { FaCheck } from "react-icons/fa"
import { useAuthUserMutation, useRegisterUserMutation, useResetPasswordMutation } from "@/slices/UsersApiSlice"
import { useState } from "react"
import { toast } from "../ui/use-toast"
import { useDispatch,  } from "react-redux"
import {  setCredentials } from "@/slices/usersSlice"
import { Link, useNavigate } from "react-router-dom"



const AuthModel = ({open,setOpen,cart = false,signupPage = false}) => {
 const [Auth, {isLoading}] = useAuthUserMutation()
 const [Register, {isLoading:loading}] = useRegisterUserMutation()
 const [reset, {isLoading:reseting}] = useResetPasswordMutation()
 const dispatch = useDispatch()
 const navigate = useNavigate()
 const [username,setUserName] = useState('')
 const [email,setEmail] = useState('')
 const [password,setPassword] = useState('')
 const [openModel,setOpenModel] = useState(false)
 const [confirmPassword,setConfirmPassword] = useState('')
 const [registerEmail,setRegisterEmail] = useState('')
 const [registerPassword,setRegisterPassword] = useState('')
 const [emailReset,setEmailReset] = useState("")
// 2. Define a submit handler.
 const handleAuth = async(e)=> {
  e.preventDefault()
    try {
       const res = await Auth({
          email,
          password
       })
       if(res.error) {
          toast({
            title: "Failed to Log you in",
            variant: "destructive"
          })
          return
       }
       dispatch(setCredentials({...res.data}))
       setOpen(false)
       if(cart) {
          navigate('/shipping') 
       }
       if(signupPage) {
        navigate('/') 
     }
       toast({
        title: "Logged in successfuly"
       })
    } catch (error) {
      console.log(error)
    }
 }
 const handleRegister = async(e)=> {
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
       dispatch(setCredentials({...res.data}))
       setOpen(false)
       if(cart) {
        navigate('/shipping') 
     }
     if(signupPage) {
      navigate('/') 
   }
       toast({
        title: "Registered successfuly",
       })
    } catch (error) {
      console.log(error)
    }
 }
 const handleClickModel = ()=> {
    setOpen(false)
    setOpenModel(true)
 }
 const handleResetRequest = async(e)=> {
  e.preventDefault()
    try {
       const res = await reset({
        email: emailReset
       })
       if(res.error) {
         toast({
          title:"something went wrong",
          variant: "destructive"
         })
         return;
       }
       
      setOpenModel(false)
     
      
      toast({
        title: "the information to reset your password were sent to your email"
      })
    } catch (error) {
      console.log(error)
    }
 }
return (
  <>
  <Dialog open={open} onOpenChange={()=> setOpen(false) } >

  <DialogContent className="bg-white max-lg:w-[95%] !rounded-[10px] z-[9999] "> 
  <Tabs defaultValue="account" className="lg:w-[400px] w-full !rounded-[10px] ">
      <TabsList className="grid w-full grid-cols-2 gap-3  ">
        <TabsTrigger className="py-2 sm:block hidden max-sm:text-sm  data-[state=active]:bg-[#00afaa] h-[40px] data-[state=active]:text-white data-[state=active]:rounded-md " value="account">Already have  an account</TabsTrigger>
        <TabsTrigger className="py-2 sm:hidden px-1 block max-sm:text-sm  data-[state=active]:bg-[#00afaa] h-[40px] data-[state=active]:text-white data-[state=active]:rounded-md " value="account"> have  an account ?</TabsTrigger>
        <TabsTrigger className="py-2 max-sm:text-sm data-[state=active]:bg-[#00afaa] h-[40px] data-[state=active]:text-white data-[state=active]:rounded-md sm:block hidden" value="password">New client  (Create account)</TabsTrigger>
        <TabsTrigger className="py-2 px-1 max-sm:text-sm data-[state=active]:bg-[#00afaa] h-[40px] data-[state=active]:text-white data-[state=active]:rounded-md sm:hidden block" value="password">New (Create account)</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card className="!border-none">
          <CardHeader>
            <CardTitle className="text-center text-black font-bold text-[30px] ">Submit</CardTitle>
            
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleAuth}>

           
            <div className="space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <Input required value={email} onChange={(e)=> setEmail(e.target.value)} className="rounded-[5px] bg-[#f5f5f5] outline-none placeholder:text-gray-500 " 
              type="email" id="email" placeholder="joe@gmail.com" />
            </div>
           
            <div className="space-y-1 mt-3">
              <Label  htmlFor="password">Password</Label>
              <Input required value={password} onChange={(e)=> setPassword(e.target.value)}  className="rounded-[5px] bg-[#f5f5f5] outline-none placeholder:text-gray-500 " type="password" id="password"  />
            </div>
            <Button type="submit" className="bg-[#0aafaa] mt-7 w-full transition-all duration-200
             text-white rounded-[5px] hover:bg-[#174d4b] " >
               {isLoading ? <img src={loader} alt="loading..." className="w-[35px] h-[35px] " /> : "Login"}  
             </Button>
            </form>
            <Button onClick={handleClickModel} type="button" className="bg-transparent hover:text-[#00afaa] mt-5 w-full text-center ">
              Forgot your password ?
            </Button>
          </CardContent>
          
        </Card>
      </TabsContent>
      <TabsContent value="password">
      <Card className="!border-none">
          <CardHeader>
            <CardTitle className="text-center text-black font-bold text-[30px] ">New client</CardTitle>
            
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleRegister} className="flex flex-col gap-3">

           
            <div className="space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <Input required value={registerEmail} onChange={(e)=> setRegisterEmail(e.target.value)} className="rounded-[5px] bg-[#f5f5f5] outline-none placeholder:text-gray-500 " 
              type="email" id="email" placeholder="joe@gmail.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Full Name</Label>
              <Input required value={username} onChange={(e)=> setUserName(e.target.value)} className="rounded-[5px] bg-[#f5f5f5] outline-none placeholder:text-gray-500 " 
              type="text" id="name" placeholder="joe rogan" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input required value={registerPassword} onChange={(e)=> setRegisterPassword(e.target.value)} className="rounded-[5px] bg-[#f5f5f5] outline-none placeholder:text-gray-500 " type="password" id="password"  />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Confirm Password</Label>
              <Input required value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} className="rounded-[5px] bg-[#f5f5f5] outline-none placeholder:text-gray-500 " type="password" id="password"  />
            </div>
            <Button type="submit" className="bg-[#0aafaa] mt-7 w-full transition-all duration-200
             text-white rounded-[5px] hover:bg-[#174d4b] flex items-center gap-1 " >
                   {loading ? <img src={loader} alt="loading..." className="w-[35px] h-[35px] " /> : <> <FaCheck /> <p>Create account</p></> }
             </Button>
            </form>
          </CardContent>
         
        </Card>
      </TabsContent>
    </Tabs>
  </DialogContent>
  </Dialog>
  <Dialog open={openModel} onOpenChange={()=> setOpenModel(false) } >

  <DialogContent className="bg-white max-sm:p-2 max-lg:w-[95%] !rounded-[10px] z-[9999] "> 
 
        <Card className="!border-none  ">
          <CardHeader> 
            <CardTitle className="text-center text-black font-bold text-[30px] mb-2 ">Password reset</CardTitle>
            <p className="mt-1 font-semibold text-[#111] leading-[1.7] text-sm ">Fill in the email address corresponding to your StarShinerS account below</p>
            
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleResetRequest}>

           
            <div className="space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <Input required value={emailReset} onChange={(e)=> setEmailReset(e.target.value)} className="rounded-[5px]  w-[90%] bg-[#f5f5f5] outline-none placeholder:text-gray-500 " 
              type="email" id="email" placeholder="joe@gmail.com" />
            </div>
           
            
            <Button disabled={reseting} type="submit" className="bg-[#0aafaa] md:block hidden mt-7 w-[90%]  transition-all duration-200
             text-white rounded-[5px] hover:bg-[#174d4b] " >
              {reseting ? <img src={loader} alt="loading..." className="w-[35px] h-[35px] " /> : "SEND E-MAIL TO RESET YOUR PASSWORD"} 
             </Button>
             <Button disabled={reseting} type="submit" className="bg-[#0aafaa] md:hidden block mt-7 w-[90%]  transition-all duration-200
             text-white rounded-[5px] hover:bg-[#174d4b] " >
              {reseting ? <img src={loader} alt="loading..." className="w-[35px] h-[35px] " /> : "SEND"} 
             </Button>
            
            </form>
           
          </CardContent>
          
        </Card>
      
   
      
     
  </DialogContent>
  </Dialog>
</>
)
}
export default AuthModel