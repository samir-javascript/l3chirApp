/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import logo from "@/assets/logol3chir2.jpg"
import admin from "@/assets/admin.png"
import { Link } from "react-router-dom"
import { FiMenu } from "react-icons/fi";
import { FaPhone, FaRegHeart, FaShoppingCart, FaUser, FaSearch, FaCheck } from 'react-icons/fa'
import { Button } from "../ui/button"
import { useState } from "react";

import AuthModel from "../models/AuthModel";
import { useSelector } from "react-redux";
//import { CiShoppingBasket, CiShoppingCart} from 'react-icons/ci'
const Navbar = () => {
  const  { userInfo } = useSelector(state => state.auth)
  const  { cartItems } = useSelector(state => state.cart)
  const navLinks = [
     {
       label: "Mon favoris",
       value: 'mon favoris',
       route: "/browse_wishlist-items",
       icon: <FaRegHeart  size={28} />
     },
     {
      label: "Mon compte",
      value: 'mon compte',
      route: "/profile",
      icon: userInfo ? <img className="w-[28px] h-[28px] rounded-full object-cover " src={userInfo?.picture || "https://github.com/shadcn.png"} alt={userInfo?.username} /> : <FaUser  size={28} />
    },
    
    {
      label: "Mon panier",
      value: 'mon panier',
      route: "/cart",
      icon:  <div className="relative">
      <FaShoppingCart className="font-bold cursor-pointer" color='#00afaa' size={24} />
      <div className="w-[21px] h-[21px] text-white flex items-center justify-center  rounded-full bg-[#000] absolute top-[-12px] right-[-12px] ">
           <p className="text-sm font-bold ">
              {cartItems && cartItems?.reduce((acc,item)=> acc + item.quantity,0)}
           </p>
      </div>
    </div>
    },
  userInfo &&  userInfo?.isAdmin && (
      {
        label: "Admin",
        value: 'admin',
        route: "/admin/dashboard",
  
      }
    )
    


  ]
  const [open,setOpen] = useState(false)
  
 
  //console.log(//cartItems.reduce((acc,item)=> acc + item.quantity,0), "qty")
  
  return (
    <header className="flex   shadow-lg w-full  h-[80px] z-[99]  bg-white ">
       <div className="w-full px-6 h-full flex items-center justify-between ">
        <ul className="lg:flex  hidden items-center gap-7">
        {navLinks.map((item)=> (
          <Link  className=" transition-all duration-300 ease-out text-[#0aafaa]" to={item?.route} key={item?.route}>
                 <li className="flex flex-col  items-center gap-1">
                     {item?.icon}
                     {item?.value === "admin" && (
                       <img className="w-[24px] h-[24px] object-contain " src={admin} alt="admin picture" />
                     )}
                      <p  className=" text-base whitespace-nowrap font-medium leading-[1.7] " >
                          {item?.label}
                      </p>

                   
                 </li>
                 </Link>
              ))}
        </ul>
       
            <Link className="lg:ml-5" to='/'> 
                  <img src={logo} className=" w-auto h-[80px] object-contain " alt="logo" />
            </Link>
          <div className="lg:flex hidden items-center justify-between gap-7">
                <p className="text-black font-semibold hover:underline cursor-pointer hover:text-gray-400 ">24hours we're open</p>
                <div className="flex items-center cursor-pointer gap-1">
                    <FaPhone  />
                    <a href={`tel:+212 (609547692)`} className="text-gray-400 text-sm  ">+212 609547692</a>
                </div>
                {!userInfo && (
                  <Button type="button" onClick={()=> setOpen(true)} className='bg-[#0aafaa] hover:bg-[#45a19e]  rounded-[5px] 
                 hover:!text-white transition-all duration-200 text-white font-semibold px-7 '>Sign up</Button>
                )}
                
          </div>
           <div className="lg:hidden flex items-center gap-4">
           <FaSearch className="font-bold cursor-pointer" color='gray' size={25} />
           <Link to="/cart" className="relative">
             <FaShoppingCart className="font-bold cursor-pointer" color='black' size={28} />
             <div className="w-[24px] h-[24px] text-white flex items-center justify-center  rounded-full bg-[#00afaa] absolute top-[-12px] right-[-12px] ">
                  <p className="text-sm font-bold ">
                     {cartItems && cartItems?.reduce((acc,item)=> acc + item.quantity,0)}
                  </p>
             </div>
           </Link>
          
           <FiMenu className="font-bold lg:hidden cursor-pointer" color='black' size={25} />
             
             
           </div>
       </div>
       <AuthModel open={open} setOpen={setOpen} />
    </header>
  )
}

export default Navbar