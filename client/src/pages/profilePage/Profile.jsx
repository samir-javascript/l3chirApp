
import { FaAngleRight, FaEdit} from "react-icons/fa";

import { Link } from "react-router-dom";
import loader from "@/assets/loader.gif"
import { TiDelete } from "react-icons/ti";
import {
     Accordion,
     AccordionContent,
     AccordionItem,
     AccordionTrigger,
   } from "@/components/ui/accordion"
   import {  clearShippingAddress} from "@/slices/cartSlice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useDeleteShipping_addressMutation, useGetShipping_addressQuery} from "@/slices/shippingApiSlice";
import ProfileTabs from "@/components/shared/ProfileTabs";

import {  useEffect, useState } from "react";
import ProfileMobileTabs from "@/components/shared/ProfileMobileTabs";
import { useChangePasswordMutation, useSaveUserDataMutation } from "@/slices/UsersApiSlice";
import { toast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import ShippingModal from "@/components/models/ShippingModal";
import { setCredentials } from "@/slices/usersSlice";
const Profile = () => {
   const [open,setOpen] = useState(false)
   const dispatch = useDispatch()
   const [type,setType] = useState('')
   const [firstName,setFirstName] = useState("")
   const [lastName,setLastName] = useState("")
   const [phoneNumber,setPhoneNumber] = useState('')
   const [oldPassword,setOldPassword] = useState("")
   const {shippingAddress   } = useSelector(state => state.cart )
  
   const [newPassword,setNewPassword] = useState("")
   const [confirmNewPassword,setConfirmNewPassword] = useState("")

    const [saveData,  {isLoading:saving}] = useSaveUserDataMutation()
    const [deleteShipping] = useDeleteShipping_addressMutation()
    const {userInfo} = useSelector(state => state.auth)
    const {data:shipping, isLoading:fetching, refetch} = useGetShipping_addressQuery()
    const handleDeleteShipping = async()=> {
       try {
       if(window.confirm('are you sure you wanna remove your shipping address?')) {
        const res = await deleteShipping()
        if(res.error) {
          toast({
            title: "Failed to delete shipping",
            variant: "destructive"
          })
          return
        }
        dispatch(clearShippingAddress())
        refetch()
        toast({
          title: "your shipping address has been deleted",
         
        })
       }
       
          
          
        
       } catch (error) {
        console.log(error)
       }
    }
    const [changePassword, {isLoading:changing}] = useChangePasswordMutation()
   
   useEffect(()=> {
      if(userInfo) {
          setFirstName(userInfo.firstName )
          setLastName(userInfo.lastName )
          setPhoneNumber(userInfo.phoneNumber)
      }else if(!userInfo && Object.keys(shippingAddress).length > 0) {
        setFirstName(shippingAddress.firstName )
        setLastName(shippingAddress.lastName )
        setPhoneNumber(shippingAddress.phoneNumber)
      }else {
        setFirstName("")
        setLastName("")
        setPhoneNumber("")
      }
   }, [shippingAddress, userInfo])
const handleChangePassword = async(e)=> {
  e.preventDefault()
  if(newPassword !== confirmNewPassword) {
    toast({
      title: "passwords must match",
      variant:"destructive"
    })
    return
  }
  try {
     const res = await changePassword({
        oldPassword,
        newPassword,
     })
     if(res.error) {
      toast({
        title:"Failed to change password!",
        variant: "destructive"
      })
      return
     }
     setNewPassword('')
     setOldPassword("")
     setConfirmNewPassword('')
     toast({
      title: "Password changed"
     })
  } catch (error) {
    console.log(error)
  }
}

const handlePersonalInfoData = async(e)=> {
    e.preventDefault()
    try {
       const res = await saveData({
        firstName,
        lastName,
        phoneNumber
       })
       if(res.error) {
        toast({
          title: "Failed to save changes",
          variant: "destructive"
        })
        return
       }
       dispatch(setCredentials({...res.data}))
       toast({
          title: "changes has been saved"
       })
    } catch (error) {
      console.log(error)
    }
}

 if(fetching) return
  return (
    <div className="w-full !bg-[#f5f5f5] h-full relative">
          <div className="max-w-[1400px] mx-auto">
             <div className="lg:py-10 py-3 lg:px-5 flex lg:flex-row flex-col">
                 
                   <ProfileTabs />
                     <ProfileMobileTabs />
                 
                 
                  <div className="flex-1 flex flex-col w-full gap-4 lg:ml-5">
                        <div className="lg:border lg:bg-white  flex flex-col  max-lg:border-t max-lg:border-[#ddd]   p-4">
                             <div className="flex items-center gap-2">
                                   <Link className="text-gray-400 text-sm capitalize hover:underline" to="/">Home</Link>
                                   <span className="text-gray-400 text-sm capitalize ">/</span>
                                   <Link className="text-gray-400 text-sm capitalize hover:underline" to="/profile">My account</Link>
                                   <span className="text-gray-400 text-sm capitalize">/</span>
                                   <Link className="text-gray-400 text-sm capitalize hover:underline" to="">Account settings</Link>
                             </div>
                             <h2 className="text-black text-xl font-semibold ">Member Profile</h2>
                             <p className="text-gray-400 text-sm mt-2">Welcome to l3chir! Here you can edit your personal information, personalize your profile and change your password!</p>
                        </div>
                        <Accordion  type="single" collapsible>
  <AccordionItem className="bg-white mb-3" value="item-1">
    <AccordionTrigger className="bg-white border-b-0 p-4 border focus:no-underline hover:no-underline border-gray-400 text-black font-bold">Personal Data</AccordionTrigger>
    <AccordionContent>
       <div className=" p-4 relative">
          <form onSubmit={handlePersonalInfoData} className="flex flex-col gap-4">
               <div className="flex flex-col gap-2 lg:w-[500px] ">
                   <Label>Last Name</Label>
                   <Input  disabled={saving} value={lastName} onChange={(e)=> setLastName(e.target.value)} className="!outline-none" type="text" />
               </div>
               <div className="flex flex-col gap-2 lg:w-[500px]">
                   <Label>First Name</Label>
                   <Input  disabled={saving} value={firstName} onChange={(e)=> setFirstName(e.target.value)} type="text" />
               </div>
               <div className="flex flex-col gap-2 lg:w-[500px]">
                   <Label>Phone Number</Label>
                   <Input  disabled={saving} value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} type="number" />
               </div>
               <Button disabled={saving} type="submit" className="green-bg hover:scale-[1.05] transition-all duration-400 ease-in-out w-fit text-white" >
                   {saving ? "saving..." : "Save changes" } 
               </Button>
          </form>
       </div>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem className="bg-white" value="item-2">
    <AccordionTrigger className="bg-white border-b-0 p-4 border focus:no-underline hover:no-underline border-gray-400 text-black font-bold">Delivery & Invoice datas</AccordionTrigger>
    <AccordionContent>
       {shipping  ? (
              <div className="p-4  pb-3 flex items-center justify-between w-full ">
                    <p className="font-medium text-base text-[#434343] "> <span className="font-bold text-black text-base ">{shipping?.firstName} {shipping?.lastName}</span> - {shipping?.address} , Meknes </p>
                    <div className="flex items-center gap-2">
                         <FaEdit onClick={()=> {
                          setType("edit")
                              setOpen(true)
                         }} color="green" cursor="pointer" size={20}/>
                          <TiDelete onClick={handleDeleteShipping} color="red"  cursor="pointer" size={20} />
                        
                    </div>
              </div>
       ): (
        <div className="flex p-4 flex-col">
        <div className="border-b pb-4 ">
             <p className="text-sm text-red-500 font-normal ">You don`t have a delivery address saved yet!</p>
        </div>
        <div className="border-b pb-3 mt-3">
        <Button onClick={()=> {
          setType("create")
          setOpen(true)
        }} type="button" className="green-bg w-fit uppercase flex items-center gap-1 text-white" >
             add new address <FaAngleRight />
        </Button>
        </div>
  </div>
       )}
        
    </AccordionContent>
  </AccordionItem>
  <AccordionItem className="bg-white mt-3" value="item-3">
    <AccordionTrigger className="bg-white border-b-0 p-4 border focus:no-underline hover:no-underline border-gray-400 text-black font-bold">Change password </AccordionTrigger>
    <AccordionContent>
       <div className=" p-4 relative">
          <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
               <div className="flex flex-col gap-2 lg:w-[500px] ">
                   <Label>Old password</Label>
                   <Input value={oldPassword} onChange={(e)=> setOldPassword(e.target.value)} className="!outline-none" type="password" />
               </div>
               <div className="flex flex-col gap-2 lg:w-[500px]">
                   <Label>New password</Label>
                   <Input value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} type="password" />
               </div>
               <div className="flex flex-col gap-2 lg:w-[500px]">
                   <Label>New password confirmation</Label>
                   <Input value={confirmNewPassword} onChange={(e)=> setConfirmNewPassword(e.target.value)} type="password" />
               </div>
               <Button disabled={changing} type="submit" className="green-bg w-fit uppercase flex items-center gap-1 text-white" >
                   {changing  ?  <img src={loader} alt="Loading..." className="w-[30px] h-[30px] " /> : <>reset password <FaAngleRight /></>} 
               </Button>
          </form>
       </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>

                  </div>
             </div>
          </div>
        <ShippingModal open={open} setOpen={setOpen} type={type} />
    </div>
  )
}

export default Profile