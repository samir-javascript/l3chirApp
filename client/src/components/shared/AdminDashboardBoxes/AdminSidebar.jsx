/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import { useLocation} from 'react-router-dom'

import logo from "@/assets/l3.png"
import { FiPieChart } from "react-icons/fi";
import { GrGroup } from "react-icons/gr";
import { FaMoneyCheck } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { MdToday} from "react-icons/md"
import { TbCalendarMonth } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";
import { IoIosTrendingUp } from "react-icons/io";

import {
  Sheet,
  SheetClose,
  SheetContent,

 


  
} from "@/components/ui/sheet"
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

export function AdminSidebar({open,setOpen}) {
  const navItems = [
    {
      text: "Dashboard",
      icon: <IoHomeOutline />,
      route: "/admin/dashboard"
    },
    {
      text: "Client Facing",
      icon: null,
    },
    {
      text: "Products",
      icon: <MdOutlineShoppingCart />,
      route: "/admin/productsList"
    },
    {
      text: "Customers",
      icon: <GrGroup />,
      route: "/admin/usersList"
    },
    {
      text: "Orders",
      icon: <FaMoneyCheck />,
      route: "/admin/ordersList"
    },
    
    {
      text: "Sales",
      icon: null,
    },
    {
      text: "Overview",
      icon: <FcSalesPerformance />,
      route: "/admin/overview"
    },
    {
      text: "Daily",
      icon: <MdToday />,
      route: "/admin/dailySales"
    },
    {
      text: "Monthly",
      icon: <TbCalendarMonth />,
      route: "/admin/monthlySales"
    },
    {
      text: "Breakdown",
      icon: <FiPieChart />,
      route: '/admin/breakdown'
    },
    {
      text: "Management",
      icon: null,
    },
    {
      text: "Admin",
      icon: <RiAdminLine />,
    },
    {
      text: "Performance",
      icon: <IoIosTrendingUp />,
    },
  ];
  const {pathname} = useLocation()
  return (
    <Sheet open={open} onOpenChange={()=> setOpen(false)}>
      
      <SheetContent className="bg-[#101538] !p-2 text-white flex overflow-y-auto flex-col gap-6 w-[300px] z-[99999] ">
        <Link to="/" className="w-full flex items-center justify-center">
             <img src={logo} alt="l3chir" className="w-full max-w-[120px] h-auto " />
        </Link>
        <div className="flex-1  flex flex-col ">
             {navItems.map((item,i)=>  {
               if(!item.icon) {
                 return (
                    <p key={i} className="px-3 my-4 text-base  ">{item.text} </p>
                 )
               }
               return (
                <SheetClose key={i} asChild>
                  
                <Link className={`${pathname.startsWith(item.route) ? "bg-[#081432]" : ""} w-full hover:bg-[#081432] rounded-[10px] p-3 flex items-center gap-3`} to={item.route}>
                     {item.icon}
                     <p className="text-[17px] leading-[140%] font-semibold " >{item.text} </p>
                </Link>
              </SheetClose>
               )
             })}
        </div>
       
      </SheetContent>
    </Sheet>
  )
}
