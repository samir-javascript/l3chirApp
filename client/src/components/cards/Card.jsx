/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Image } from "react-bootstrap"
// import salade from '@/assets/tacos.png'
import { Link } from "react-router-dom"
import { FaEye , FaHeart, FaRegHeart} from 'react-icons/fa'
import { useGetCurrentUserQuery, useToggleWishlistMutation } from "@/slices/UsersApiSlice"
import { toast } from "../ui/use-toast"
import { useSelector } from "react-redux"
const Card = ({product}) => {
 
  const [toggleWishlist, {isLoading}] = useToggleWishlistMutation()
  
    const {data:currentUser, isLoading:loading, isError, refetch} = useGetCurrentUserQuery()
  
  
  const handleToggleWishlist = async()=> {
    try {
      const res = await toggleWishlist({
        productId: product._id
      })
      if(res.error) {
        toast({
          title:"Failed to complete this action!",
          variant:"destructive"
        })
        return;
      }
      refetch()
    } catch (error) {
      console.log(error)
    }
  }
  if(loading) return "loading";
  if(isError) return 'Error happended'
  const pro = currentUser.saved.includes(product._id);
  
  return (
    <div className="w-[210px]  max-sm:w-[182px] min-h-auto h-[380px]   rounded-[15px]  flex flex-col shadow-sm border border-[#f5f5f5] ">
         <div className=" bg-[#f5f5f5]  relative flex items-center 
      justify-center w-full h-[210px] rounded-tl-[15px] rounded-tr-[15px] ">
             <Image fluid className="w-auto aspect-auto h-full  rounded-tl-[15px]
              rounded-tr-[15px] object-cover" 
              alt='pic' src={product.images[0]}  />
              <div onClick={handleToggleWishlist} className="absolute
               cursor-pointer bottom-0 right-0 m-2 w-[35px] h-[35px]
                rounded-full bg-white flex items-center justify-center ">
                {pro ? (
                  <FaHeart size={22} color='red' />
                ): (
                  <FaRegHeart size={22} color='#00afaa' />
                )}
                 
              </div>
         </div>
         <div className="flex flex-col justify-between p-3">
            <div className="mb-6"> 
            <Link to={`/food_product/${product._id}`} className="text-[#111] line-clamp-2 font-semibold text-[14px] leading-tight hover:text-[#0aafaa] hover:underline capitalize  ">
                  <p>    
                    {product.name}
                  </p>
            </Link>
            <p className="text-[13px] text-[#00afaa] font-semibold "><span className="font-normal text-gray-400 ">Vendu par</span> L3chir</p>
            </div>
            <div className="flex mt-auto justify-between">
                <div className="flex flex-col">
                    <p className="text-[#00afaa] text-[18px] font-bold ">{product.type === "food" ? product.prices[0].price : product.price}Dh</p>
                    <p className="line-through font-normal text-gray-400 text-[13px] ">{product.prevPrice}Dh</p>
                </div>
                <Link to={`/food_product/${product._id}`} className="w-[40px] cursor-pointer rounded-full h-[40px] bg-[#0aafaa] flex items-center justify-center ">
                    <FaEye size={22} color="white" />
                </Link>
            </div>
         </div>
    </div>
  )
}

export default Card