import ProfileMobileTabs from "@/components/shared/ProfileMobileTabs"
import ProfileTabs from "@/components/shared/ProfileTabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setCredentials } from "@/slices/usersSlice"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useUpdateProfileMutation } from "@/slices/UsersApiSlice"
import UploadProfile from "@/components/shared/UploadProfile"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "@/components/ui/use-toast"

const CustomerSettingAccount = () => {
   const { userInfo } = useSelector(state => state.auth)
   const [email,setEmail] = useState('')
   const dispatch = useDispatch()
   const [UserName,setUserName] = useState('')
   const [picture,setPicture] = useState("")
   const [newPassword,setNewPassword] = useState("")
   const [confirmNewPassword,setConfirmNewPassword] = useState("")
   useEffect(()=>  {
      if(userInfo) {
         setEmail(userInfo.email)
         setUserName(userInfo.username)
         setPicture(userInfo?.picture)
      }
       
   },[userInfo])
   // eslint-disable-next-line no-unused-vars
   const [updateProfile, {isLoading}] = useUpdateProfileMutation()
   const  handleUpdateProfile = async(e)=> {
   
      e.preventDefault()
      if(newPassword && newPassword !== confirmNewPassword) {
           toast({
            title: "Passwords must match!",
            variant: "destructive"
           })
           return;
      }
      try {
         const res = await updateProfile({
             picture,
             username: UserName,
             email,
             password: newPassword
         })
         if(res.error) {
            toast({
               title: "Failed to update profile",
               variant:"destructive"
            })
            return
         }
         dispatch(setCredentials({...res.data}))
         toast({
            title:"profile updated successfuly"
         })
      } catch (error) {
         console.log(error)
      }
   }
  return (
    <div className="w-full !bg-[#f5f5f5] h-full relative">
    <div className="max-w-[1400px] mx-auto">
       <div className="py-10 lg:px-5 flex lg:flex-row flex-col">
           
                 <ProfileMobileTabs />
                <ProfileTabs />
            
           
            <div className="flex-1 flex flex-col w-full gap-4 lg:ml-5">
                  <div className="lg:border max-lg:border-t lg:bg-white  flex flex-col  p-4">
                       <div className="flex items-center gap-2">
                             <Link className="text-gray-500 text-sm capitalize hover:underline" to="/">Home</Link>
                             <span className="text-gray-500 text-sm capitalize ">/</span>
                             <Link className="text-gray-500 text-sm capitalize hover:underline" to="/profile">My account</Link>
                             <span className="text-gray-500 text-sm capitalize">/</span>
                             <Link className="text-gray-500 text-sm capitalize hover:underline" to="/customer/account/edit">Account settings</Link>
                       </div>
                       <h2 className="text-black text-xl font-semibold ">My Account settings</h2>
                       <p className="text-gray-500 text-sm mt-2">here you can edit your account settings and personal info!</p>
                  </div>
                   <div className="border bg-white  flex flex-col border-gray-400 p-4">
                        <h2 className="font-semibold text-black text-xl mb-5 ">Edit my profile</h2>
                        <div className="items-start flex lg:flex-row flex-col gap-5 w-full">
                             <div>
                                  <UploadProfile mediaUrl={userInfo?.picture} setImage={setPicture} />
                             </div>
                             <form onSubmit={handleUpdateProfile} className="flex w-full flex-1 flex-col gap-3">
                                   <div className="max-w-[500px] flex flex-col gap-2 ">
                                      <Label>Email Address</Label>
                                      <Input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                                   </div>
                                   <div className="max-w-[500px] flex flex-col gap-2 ">
                                      <Label>UserName</Label>
                                      <Input type="text" value={UserName} onChange={(e)=> setUserName(e.target.value)} />
                                   </div>
                                   <div className="max-w-[500px] flex flex-col gap-2 ">
                                      <Label>New Password</Label>
                                      <Input type="password" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} />
                                   </div>
                                   <div className="max-w-[500px] flex flex-col gap-2 ">
                                      <Label>Confirm Password</Label>
                                      <Input type="password" value={confirmNewPassword} onChange={(e)=> setConfirmNewPassword(e.target.value)}/>
                                   </div>
                                   <Button disabled={isLoading} className="bg-[#00affa] w-fit mt-2 rounded-[5px] font-semibold text-base text-white " type="submit">
                                     {isLoading ? "Loading..." : "Update Profile"}  
                                   </Button>
                             </form>
                        </div>
                   </div> 
           

            </div>
       </div>
    </div>
</div>
  )
}

export default CustomerSettingAccount