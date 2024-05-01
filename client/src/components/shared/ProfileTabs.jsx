/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { FaAngleRight, FaHeart, FaShopify, FaUser } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { TbAddressBookOff } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loader from "@/assets/loader.gif"
import { RiLogoutCircleLine } from "react-icons/ri";
import { useGetCurrentUserQuery, useLogoutUserMutation } from "@/slices/UsersApiSlice";
import { logOutUser, setCredentials } from "@/slices/usersSlice";
import { toast } from "../ui/use-toast";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { useUpdateProfilePictureMutation } from "@/slices/UsersApiSlice";
import { reset } from "@/slices/cartSlice";

const ProfileImage = () => {
  const { userInfo } = useSelector(state => state.auth);
  const [fileUrl, setFileUrl] = useState(userInfo?.picture);
  const dispatch = useDispatch();
  const [UpdatePicture, { isLoading }] = useUpdateProfilePictureMutation();

  const updatePictureHandler = async (image) => {
    try {
      const res = await UpdatePicture({ picture: image });
      if (res.error) {
        toast({
          title: "Failed to update profile picture!",
          variant: "destructive"
        });
        return;
      }
      dispatch(setCredentials({ ...res.data }));
      toast({
        title: "Profile picture has been updated"
      });
    } catch (error) {
      console.log(error);
    }
  }

 ;

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileUrl(reader.result);
        updatePictureHandler(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [updatePictureHandler]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="relative w-[130px] rounded-full overflow-hidden">
        <img className="rounded-full w-full h-full object-cover" src={fileUrl || "https://github.com/shadcn.png"} alt="profile" />
        <div className="absolute cursor-pointer bottom-0 w-full flex items-center justify-center bg-blk h-[40px] rounded-b-full">
          {isLoading ? (
            <img src={loader} className="w-[30px] h-[30px] " alt="loading..." />
          ) : <FaCamera color="white" />}
        </div>
      </div>
    </div>
  );
};

const ProfileTabs = () => {
  const { pathname } = useLocation();
  const { userInfo } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileTabs = [
    { title: 'mon compte', url: "/profile", icon: <FaUser color="gray" /> },
    { title: 'Historique des commandes', url: '/sales/history', icon: <FaShopify color="gray" /> },
    { title: "Ma liste d'envie", url: "/browse_wishlist-items", icon: <FaHeart color="gray" /> },
    { title: "information du compte", url: "/customer/account/edit", icon: <MdAccountCircle color="gray" /> },
    { title: "Carnet d'adresses", url: "/customer/address", icon: <TbAddressBookOff color="gray" /> },
  ];

  const [LogOut, { isLoading }] = useLogoutUserMutation();

  const handleLogOut = async () => {
    try {
      await LogOut();
      dispatch(logOutUser());
     // dispatch(reset())
      navigate("/");
      toast({
        title: "Logged out successfully"
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:flex hidden flex-col gap-3">
      <div className="border bg-white items-center justify-center text-center flex flex-col border-gray-400 px-4 py-2">
        <ProfileImage />
        <p className="text-sm text-gray-600 font-medium mt-3 ">
          {userInfo?.email}
        </p>
        <Link to={`/customer/account/edit`} className="text-[#00affa] hover:underline text-sm font-medium mt-2">Edit profile</Link>
      </div>
      <div className="border bg-white  flex flex-col border-gray-400 ">
        {profileTabs.map((item, i) => (
          <Link className={`${pathname.startsWith(item.url) ? "bg-[#e5e5e5] " : ""}  
          flex px-3 py-3 group items-center justify-between `} to={item.url} key={i}>
            <div className="gap-2 flex items-center">
              {item.icon}
              <p className="text-gray-500 group-hover:underline text-sm">{item.title} </p>
            </div>
            {pathname.startsWith(item.url) && <FaAngleRight color="gray" />}
          </Link>
        ))}
        <div onClick={handleLogOut} className="flex items-center p-3 group cursor-pointer gap-2 ">
          <RiLogoutCircleLine />
          {isLoading && "Loading..."} <p className="text-gray-500  group-hover:underline text-sm">Logout </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;
