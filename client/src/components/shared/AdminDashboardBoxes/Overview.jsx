/* eslint-disable no-unused-vars */

import AdminNavbar from "@/components/shared/AdminDashboardBoxes/AdminNavbar"
import { AdminSidebar } from "@/components/shared/AdminDashboardBoxes/AdminSidebar"
import { useGetStatesQuery } from "@/slices/ProductsApiSlice"
import { ResponsiveLine } from "@nivo/line"
import { useMemo, useState } from "react"
import { Form } from "react-bootstrap"
import OverViewChart from "./OverViewChart"





const Overview = () => {

  
    const {data,isLoading} = useGetStatesQuery()
    const [open,setOpen] = useState(false)
  
   const  [view,setView] = useState("units")
  if(isLoading) return 'Loading...'
 
  return (
    <div className="flex w-full h-screen bg-[#101538] flex-col">
    <AdminNavbar open={open} setOpen={setOpen} />
    <AdminSidebar open={open} setOpen={setOpen} />
    <div className="h-[75vh] ">
    <Form.Group controlId="view" className="my-2 mx-5 w-fit">
            <Form.Label className="font-bold text-white text-sm">
              View <span className="text-red-500">*</span>
            </Form.Label>
            <Form.Control
             
              required
              as="select"
              value={view}
              onChange={(e) => setView(e.target.value)}
            >
              
              <option value={"sales"}>sales</option>
              <option value={"units"}>units</option>
            </Form.Control>
          </Form.Group>


        <OverViewChart isDashboard={false} view={view} data={data}  />
    </div> 
   
</div>
  )
}
export default Overview
