/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import loader from "@/assets/loader.gif"
import { useDispatch } from "react-redux"
import { useAddNewShipping_addressMutation, useDeleteShipping_addressMutation, useEditShipping_addressMutation, useGetShipping_addressQuery } from "@/slices/shippingApiSlice"
import { clearShippingAddress, saveShippingAddress } from "@/slices/cartSlice"
import { toast } from "../ui/use-toast"
const ShippingModal = ({setOpen,type,open}) => {
    const [newAddress,setNewAddress] = useState('')
    const [newFirstName,setNewFirstName] = useState('')
    const [newLastName,setNewLastName] = useState('')
    const [newPhoneNumber,setNewPhoneNumber] = useState(null)
  
    const [editShipping,  {isLoading:editing}] = useEditShipping_addressMutation()
    const [addShipping, {isLoading:creating}] = useAddNewShipping_addressMutation()
    const {data:shipping, isLoading:fetching, refetch} = useGetShipping_addressQuery()
    const dispatch = useDispatch()
    useEffect(()=> {
        if(shipping && type === "edit") {
            setNewFirstName(shipping.firstName)
            setNewLastName(shipping.lastName)
            setNewPhoneNumber(shipping.phoneNumber)
            setNewAddress(shipping.address)
        }
    }, [shipping,type])
   
    const handleSubmit = async(e)=> {
        e.preventDefault()
        if(type === "create") {
         try {
           const res = await addShipping({
               lastName: newLastName,
               firstName: newFirstName,
               address: newAddress,
               phoneNumber: newPhoneNumber
           })
           if(res.error) {
             toast({
               title: "Failed to add a new Shipping address",
               variant: "destructive"
             })
             return
           }
           dispatch(saveShippingAddress({...res.data}))
            refetch()
            setNewFirstName("")
            setNewLastName("")
            setNewPhoneNumber("")
            setNewAddress("")
            setOpen(false)
            toast({
             title: "shipping added"
            })
        } catch (error) {
          console.log(error)
        }
        }else if(type === "edit") {
           try {
              const res = await editShipping({
               lastName: newLastName,
               firstName: newFirstName,
               address: newAddress,
               phoneNumber: newPhoneNumber
              })
              if(res.error) {
                toast({
                 title: "Failed to edit shipping",
                 variant: "destructive"
                })
                return
              }
              dispatch(saveShippingAddress({...res.data}))
              refetch()
              setOpen(false)
              setNewFirstName("")
              setNewLastName("")
              setNewPhoneNumber("")
              setNewAddress("")
              toast({
                title: "shipping updated"
              })
               
           } catch (error) {
             console.log(error)
           }
        }
       
     }
     if(fetching) return "Fetching"
  return (
    <>
         <Dialog open={open} onOpenChange={()=> setOpen(false) }>
      
      <DialogContent className="sm:!w-[625px] lg:!w-full w-[325px]  bg-white">
         <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                <h2 className="font-semibold text-black text-xl mb-3 ">{type === "edit" ? "Edit shipping address" : "Add new address"} </h2>
               <div className="flex  flex-col w-full gap-3 items-center lg:justify-between">
              <div className="space-y-1 w-full">
              <Label htmlFor="name">Last Name</Label>
              <Input required disabled={creating} value={newLastName} onChange={(e)=> setNewLastName(e.target.value)}
               className="rounded-[5px] w-full bg-[#f5f5f5] outline-none
                placeholder:text-gray-500 " 
              type="text" id="name"  />
            </div>
            <div className="space-y-1 w-full">
              <Label htmlFor="description">First Name</Label>
              <Input required disabled={creating} value={newFirstName} onChange={(e)=> setNewFirstName(e.target.value)} className="rounded-[5px] w-full bg-[#f5f5f5] outline-none placeholder:text-gray-500 " 
              type="text" id="description" />
            </div>
               </div>
               <div className="flex  flex-col w-full gap-3 items-center lg:justify-between">
              <div className="space-y-1 w-full">
              <Label htmlFor="phone">Phone</Label>
              <Input required disabled={creating} value={newPhoneNumber} onChange={(e)=> setNewPhoneNumber(e.target.value)} className="rounded-[5px] w-full bg-[#f5f5f5] outline-none placeholder:text-gray-500 " 
              type="number" id="phone"  />
            </div>
          
               </div>
              
              
             
              <div className="space-y-1 w-full">
              <Label htmlFor="address">Address</Label>
              <Input required disabled={creating } value={newAddress} onChange={(e)=> setNewAddress(e.target.value)} className="rounded-[5px] w-full bg-[#f5f5f5] outline-none placeholder:text-gray-500 " 
              type="text" id="address"  />
            </div>
          
               <div className="w-full flex gap-2 items-center">
                    <Button disabled={creating}  className="bg-[#0aafaa] rounded-[5px] hover:bg-initial hover:opacity-[0.90] text-white w-full  " type="submit">
                        {creating || editing ? <img src={loader} alt="Loading..." className="w-[30px] h-[30px] " /> : "Valider"}
                    </Button>
                    <Button onClick={()=> setOpen(false)} disabled={creating } className="bg-transparent rounded-[5px] border w-full" type="button">Annuler</Button>
               </div>

         </form>
      
      </DialogContent>
    </Dialog>
    </>
  )
}

export default ShippingModal