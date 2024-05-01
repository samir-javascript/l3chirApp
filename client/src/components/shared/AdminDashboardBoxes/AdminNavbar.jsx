/* eslint-disable react/prop-types */
import { MdOutlineLightMode } from "react-icons/md";

import { MdMenu } from "react-icons/md";
import { Input } from "../../ui/input";
import { FiSearch } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { Image } from "react-bootstrap";
import { useGetCurrentUserQuery } from "@/slices/UsersApiSlice";
// eslint-disable-next-line no-unused-vars
const AdminNavbar = ({open,setOpen}) => {
  const {data:currentUser, isLoading:loading, isError} = useGetCurrentUserQuery()
  if(isError) return "Error"
  if(loading) return;

  return (
    <nav  className="w-full bg-[#101538] shadow-xl px-3  h-[80px] text-white  flex items-center justify-between ">
         <div className="flex items-center gap-2 ">
                {/* menu goes here */}
                <div onClick={()=> setOpen(true)} className="w-[50px] cursor-pointer h-[50px] rounded-full hover:bg-[#081432] flex items-center justify-center ">
                <MdMenu size={30}  color='white'/>
                </div>
                <div className="md:flex hidden bg-[rgb(36,45,117)] px-3  rounded-[10px] w-[300px] lg:w-[400px] items-center justify-between">
                       <Input placeholder='Search...' className="bg-transparent placeholder:text-gray-300 text-[16px] !p-0 !border-none !outline-none" />
                       <FiSearch  />
                </div>
                {/* search goes heree */}
         </div>
           <div className="flex items-center gap-4">
                <MdOutlineLightMode className="md:block hidden" color='white' size={25} />
                <IoMdSettings className="md:block hidden" color='white' size={25} />
                <div className="bg-[#081432]  flex items-center gap-3 p-2 rounded-[5px] ">
                     <Image src={currentUser?.picture  || "https://www.github.com/shadcn.png"} alt='profile admin picture' className="w-[45px] h-[45px] object-contain rounded-full " />
                      <div className="flex flex-col">
                            <p className="text-base font-semibold text-blue-700 whitespace-nowrap capitalize ">
                               {currentUser?.username}
                            </p>
                            <p className="text-sm text-blue-700 ">l3chir center</p>
                      </div>
                      <svg
  className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium text-blue-800" // Add Tailwind CSS class for blue color
  focusable="false"
  aria-hidden="true"
  viewBox="0 0 24 24"
  width="28" // Set a specific width to make it smaller
  height="28" // Set a specific height to maintain aspect ratio
  xmlns="http://www.w3.org/2000/svg" // Add XML namespace attribute
  data-testid="ArrowDropDownOutlinedIcon"
>
  <path d="m7 10 5 5 5-5z" /> {/* Path for the arrow icon */}
</svg>

                </div>
           </div>
    </nav>
  )
}

export default AdminNavbar