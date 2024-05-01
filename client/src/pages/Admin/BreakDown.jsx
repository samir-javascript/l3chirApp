/* eslint-disable no-unused-vars */
import Pie from "@/components/shared/AdminDashboardBoxes/Pie"
import AdminNavbar from "@/components/shared/AdminDashboardBoxes/AdminNavbar"
import { AdminSidebar } from "@/components/shared/AdminDashboardBoxes/AdminSidebar"
import { useState } from "react"




const OrdersList = () => {

  
 
    const [open,setOpen] = useState(false)
  
 
  
  
  return (
    <div className="flex w-full h-screen bg-[#101538] flex-col">
    <AdminNavbar open={open} setOpen={setOpen} />
    <AdminSidebar open={open} setOpen={setOpen} />
    <div className="flex-1 h-full mt-5 max-w-[1400px] w-full mx-auto ">

       <Pie isDashboard={false} />
   
       
    </div> 
   
</div>
  )
}
export default OrdersList
