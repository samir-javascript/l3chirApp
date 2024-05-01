/* eslint-disable no-unused-vars */
import AdminNavbar from "@/components/shared/AdminDashboardBoxes/AdminNavbar"
import { AdminSidebar } from "@/components/shared/AdminDashboardBoxes/AdminSidebar"
import { useState } from "react"
import { Table } from "react-bootstrap"
import { useUpdateOrderStatusMutation } from "@/slices/ordersApiSlice"
import {
  DropdownMenu,
 
  DropdownMenuContent,
 
  DropdownMenuItem,
 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"



import { toast } from "@/components/ui/use-toast"
import { useGetOrdersQuery } from "@/slices/ordersApiSlice"
import { Link } from "react-router-dom"
const OrdersList = () => {
  const {data, isLoading, refetch} = useGetOrdersQuery()
  const [updateStatus, {isLoading:updating}] = useUpdateOrderStatusMutation()
  
 
    const [open,setOpen] = useState(false)
    const arrayStatus = [
        {
          statusName: "processing",
          value: "Processing"
        },
        {
          statusName: "out for delivery",
          value: "Out For Delivery"
        },
        {
          statusName: "delivered",
          value: "Delivered"
        },

    ]
   const handleUpdateStatus = async(id,status)=> {
      try {
         const res = await updateStatus({
            status,
            orderId: id
         })
         if(res.error) {
            toast({
              title: "Failed to update order status",
              variant: "destructive"
            })
            return
         }
         refetch()
         toast({
          title: "order status has been updated successfuly"
         })
      } catch (error) {
        console.log(error)
      }
   }
  
  if(isLoading) return "Loading..."
  return (
    <div className="flex w-full h-screen bg-[#101538] flex-col">
    <AdminNavbar open={open} setOpen={setOpen} />
    <AdminSidebar open={open} setOpen={setOpen} />
    <div className="flex-1 mt-5 max-w-[1400px] w-full mx-auto ">
    <div className=" flex flex-col-reverse items-start w-full justify-between lg:flex-row">
       
              
                  <h2 className="font-bold text-white max-sm:mb-3 lg:text-[30px]  mb-5 text-[25px] mx-3 ">Orders List </h2>
                 
              
              
        </div>
       
   
         <Table responsive striped hover bordered variant="dark"   >
             <thead>
                <tr>
                    <th className="w-fit">Customer Name</th>
                    <th className="whitespace-nowrap ">Customer Email</th>
                    <th className="whitespace-nowrap "> phoneNumber</th>
                    <th className="whitespace-nowrap ">Customer Address</th>
                    <th className="whitespace-nowrap ">Order TotalPrice</th>
                    <th className="whitespace-nowrap ">Date</th>
                    <th className="whitespace-nowrap ">Delivery_Status</th>
                    <th className="whitespace-nowrap ">Order Details</th>
                </tr>
             </thead>
             <tbody>
               {data?.orders.map(order => (
 <tr key={order._id}>
 <td className="max-sm:text-sm font-medium whitespace-nowrap text-base ">
      {order.shippingAddress.firstName} {order.shippingAddress.lastName}
 </td>
 <td>
     <p className=' max-sm:text-sm font-medium line-clamp-2 text-base '>
     {order.user.email}
     </p>
 </td>
 <td>
    <p className="text-base whitespace-nowrap font-medium">
       0{order.shippingAddress.phoneNumber}
    </p>
 </td>
 <td>
    <p className="text-base whitespace-nowrap font-medium">{order.shippingAddress.address} </p>
 </td>
 <td className="max-sm:text-sm font-medium whitespace-nowrap text-base ">
     Dh{order.totalPrice}
 </td>
 <td className="max-sm:text-sm font-medium whitespace-nowrap text-base ">
     {order.createdAt.substring(0,10)}
 </td>
 <td className="max-sm:text-sm group  font-medium whitespace-nowrap text-base ">
  <div className="flex items-center justify-between ">
         <p className={`${order.status === "delivered" ? "animate-none text-green-500 capitalize" : "animate-pulse"}`}> {order.status}</p>
         <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="bg-transparent font-bold outline-none border-none ring-0">...</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px] bg-white text-black ">
          
          {arrayStatus.map((item) => (
            <DropdownMenuItem  onClick={()=> handleUpdateStatus(order._id,item.statusName)} key={item.value} className={`${order.status === item.statusName  ? "bg-gray-100 animate-pulse" : ""} hover:bg-gray-100 cursor-pointer`}>
            <p className="text-sm font-medium capitalize text-gray-500">{item.statusName} </p>
        </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
    
   

 </td>
 <td>

  <Link to={`/payment/${order._id}/thank_you`} target="_blank">
  <Button type="button" className="text-white bg-[#00afaa] rounded-[5px] " >View Order</Button>
  </Link>
  
 </td>
</tr>
               ))}
               
               
             </tbody>
        </Table> 
    </div> 
   
</div>
  )
}
export default OrdersList
