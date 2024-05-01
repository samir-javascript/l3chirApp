/* eslint-disable no-unused-vars */
import AdminNavbar from "@/components/shared/AdminDashboardBoxes/AdminNavbar"
import { AdminSidebar } from "@/components/shared/AdminDashboardBoxes/AdminSidebar"
import { useState } from "react"
import { Table } from "react-bootstrap"
import { useGetUsersQuery } from "@/slices/UsersApiSlice"
import { useDeleteUserMutation, useUpdateUsersMutation } from "@/slices/UsersApiSlice"



import { toast } from "@/components/ui/use-toast"

import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa"
import UserModel from "@/components/models/UserModel"
import { useLocation } from "react-router-dom"
import Pagination from "@/components/shared/Pagination"
const UsersList = () => {

 const {search} = useLocation()
  const searchParams = new URLSearchParams(search)
  const pageNumber = searchParams.get('pageNumber') || 1
const [open,setOpen] = useState(false)
const [openModel,setOpenModel] = useState(false)
const [userId,setUserId] = useState("")
const  { data, isLoading, isError,refetch} = useGetUsersQuery({pageNumber})
const [deleteUser] = useDeleteUserMutation()
const [updateUser, {isLoading:updating}] = useUpdateUsersMutation()


const handleDelete = async(id)=> {
    try {
       const res = await deleteUser({
           userId:id
       })
       if(res.error) {
       
          toast({
            title: res.error.data.message || "Failed to delete user"      ,
           variant: "destructive",
          })
         return
       }
       refetch()
       toast({
        title: "user deleted"
       })
    } catch (error) {
      console.log(error)
    }
}

if(isError) return "Error"
if(isLoading) return "Loading..."
  return (
    <div className="flex w-full h-full bg-[#101538] flex-col">
    <AdminNavbar open={open} setOpen={setOpen} />
    <AdminSidebar open={open} setOpen={setOpen} />
    <div className="flex-1 mt-5 max-w-[1600px] w-full mx-auto ">
   
       
              
                  <h2 className="font-bold text-white max-sm:mb-3 lg:text-[30px]  mb-5 text-[25px] mx-3 ">Users List </h2>
                 
              
              
       
       
   
          <Table responsive striped hover bordered variant="dark"   >
             <thead>
                <tr>
                    <th className="w-fit">Picture</th>
                    <th className="whitespace-nowrap ">Name</th>
                    <th className="whitespace-nowrap "> Email</th>
                    <th className="whitespace-nowrap ">isAdmin</th>
                    <th className="whitespace-nowrap ">Actions</th>
                 
                   
                </tr>
             </thead>
             <tbody>
               {data?.users.map(user => (
 <tr key={user._id}>
 <td className="max-sm:text-sm font-medium whitespace-nowrap text-base ">
  <div className="flex items-center justify-center">
  <img className="w-[80px] h-[80px] object-contain rounded-md " src={user?.picture || "https://github.com/shadcn.png"} alt="" />
  </div>
     
 </td>
 <td>
     <p className=' max-sm:text-sm font-medium line-clamp-2 text-base '>
         {user?.username}
     </p>
 </td>
 <td>
    <p className="text-base whitespace-nowrap font-medium">
       {user.email}
    </p>
 </td>
  <td >
    <div className="flex items-center justify-center text-center">
    {user.isAdmin ? <FaCheck color="green"  /> : <FaTimes color="red" />}
    </div>
    
  </td>

  <td>
      <div className="flex items-center justify-center text-center gap-3">
            <FaEdit onClick={()=> {
              setUserId(user._id)
               setOpenModel(true)
            }} cursor="pointer" color="green" />
            <FaTrash onClick={()=> handleDelete(user._id)} cursor="pointer" color="red" />
      </div>
  </td>
 
</tr>
               ))}
               
               
             </tbody>
        </Table>  
    </div> 
    <Pagination page={data.page} pages={data.pages} />
   <UserModel id={userId} refetch={refetch} open={openModel} setOpen={setOpenModel} /> 
</div>
  )
}
export default UsersList
