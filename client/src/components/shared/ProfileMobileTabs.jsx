/* eslint-disable no-unused-vars */
import { useLogoutUserMutation } from "@/slices/UsersApiSlice";
import { logOutUser } from "@/slices/usersSlice";
import { LogOut } from "lucide-react";
import { FaHeart, FaShopify, FaUser } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { TbAddressBookOff } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "../ui/use-toast";
import { reset } from "@/slices/cartSlice";

const ProfileMobileTabs = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const  { userInfo} = useSelector(state => state.auth)
    console.log(userInfo, "userinfo")
    const {pathname} = useLocation()
    const profileTabs = [
        { title: 'mon compte', url: "/profile", icon: userInfo ? <img className="md:w-[100px] md:h-[100px] w-[70px] h-[70px] rounded-full object-cover " src={userInfo?.picture} alt={userInfo?.username} /> : <FaUser size={40}  /> },
        { title: 'mes commandes', url: '/sales/history',icon: <FaShopify  size={40}  /> },
        { title: "Ma liste d'envie", url: "/browse_wishlist-items"  , icon: <FaHeart size={40}   />},
        { title: "information du compte", url: "/customer/account/edit",icon: <MdAccountCircle size={40}  />},
        { title: "Carnet d'adresses", url: "/customer/address", icon: <TbAddressBookOff size={40} /> },
       
       
      ];
      const [LogOutUser, { isLoading }] = useLogoutUserMutation();

      const handleLogOut = async () => {
        try {
          await LogOutUser();
         // dispatch(reset())
          dispatch(logOutUser());
          navigate("/");
          toast({
            title: "Logged out successfully"
          });
        } catch (error) {
          console.log(error);
        }
      };
    
  return (
    <div className="flex w-full overflow-x-scroll gap-x-[60px] px-4 lg:hidden ">
          {profileTabs.map((item,i)=> (
            <Link className="flex flex-col gap-1 items-center text-center" to={item.url} key={i}>
                  <div className={`${item.url === pathname ? "bg-[#0b4d54]" : "bg-[#ddd]"} md:w-[100px] md:h-[100px] w-[70px] h-[70px] rounded-full flex justify-center items-center`}>
                     <div className={pathname === item.url ? 'text-white' : "text-[#0b4d54]"}>  {item.icon}</div>
                   
                  </div>
                  <p className="text-[12px] md:text-[15px] font-medium  mb-2 mt-1  ">{item.title} </p>
            </Link>
          ))}
          <div onClick={handleLogOut} className="flex flex-col gap-1 items-center text-center">
                  <div className={` md:w-[100px] bg-[#ddd] md:h-[100px] w-[70px] h-[70px] rounded-full flex justify-center items-center`}>
                     <div className={"text-[#0b4d54]"}>  
                         <LogOut size={40} /> 
                     </div>
                   
                  </div>
                  <p className="text-[12px] md:text-[15px] font-medium  mb-2 mt-1  ">LogOut </p>
            </div>
    </div>
  )
}

export default ProfileMobileTabs