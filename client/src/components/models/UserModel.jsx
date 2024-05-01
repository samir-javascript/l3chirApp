/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import loader from '@/assets/loader.gif'

import { useGetUserByIdQuery, useUpdateUsersMutation } from "@/slices/UsersApiSlice"
import { toast } from "../ui/use-toast"


const UserModel = ({setOpen,open,refetch,id}) => {
    const [username,setUsername] = useState("")
    const [updateUser, {isLoading:editing}] = useUpdateUsersMutation()
    const { data:user,isLoading,error} = useGetUserByIdQuery(id)
    const [email,setEmail] = useState("")
   

    const [isAdmin,setIsAdmin] = useState(false)
    useEffect(()=> {
       if(user) {
          setIsAdmin(user.isAdmin)
          setEmail(user.email)
          setUsername(user.username)
       }
    }, [user])
    const handleSubmit = async(e)=> {
      e.preventDefault()
        try {
            const res = await updateUser({
                isAdmin,
                email,
                username,
                userId: id
            })
            if(res.error) {
               toast({
                  title: "Failed to update user",
                  variant: "destructive"
               })
               return
            }
          //  dispatch(setCredentials({...res.data}))
             refetch()
             setOpen(false)
             toast({
              title: "User updated"
             })
        } catch (error) {
             console.log(error)
        }
    }
   if(error) return 
   if(isLoading) return "Loading..."
  return (
    <Dialog open={open} onOpenChange={()=> setOpen(false) }>
      
    <DialogContent className="sm:!w-[625px] lg:!w-full w-[325px]  bg-white">
       <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
              <h2 className="font-semibold text-black text-xl mb-3 ">Edit User</h2>
             <div className="flex  flex-col w-full gap-3 items-center lg:justify-between">
            <div className="space-y-1 w-full">
            <Label htmlFor="name">User Name</Label>
            <Input  value={username} onChange={(e)=> setUsername(e.target.value)}
             className="rounded-[5px] w-full bg-gray-100 outline-none
              placeholder:text-gray-500 " 
            type="text" id="name"  />
          </div>
          <div className="space-y-1 w-full">
            <Label htmlFor="description">User Email Address</Label>
            <Input  value={email} onChange={(e)=> setEmail(e.target.value)} className="rounded-[5px] w-full bg-[#f5f5f5] outline-none placeholder:text-gray-500 " 
            type="text" id="description" />
          </div>
          <div className="space-x-1 mt-2 flex items-center w-full">
          <input type="checkbox" checked={isAdmin === true} 
               value={isAdmin} onChange={(e)=> setIsAdmin(e.target.checked) } />
            <p className="font-semibold text-black text-base">isAdmin User</p>
           
          </div>
             </div>
           
            
            
           
           
        
             <div className="w-full flex gap-2 items-center">
                  <Button   className="bg-[#0aafaa] rounded-[5px] hover:bg-initial hover:opacity-[0.90] text-white w-full  " type="submit">
                      { editing ? <img src={loader} alt="Loading..." className="w-[30px] h-[30px] " /> : "Valider"}
                  </Button>
                  <Button onClick={()=> setOpen(false)} disabled={editing } className="bg-transparent rounded-[5px] border w-full" type="button">Annuler</Button>
             </div>

       </form>
    
    </DialogContent>
  </Dialog>
  )
}

export default UserModel