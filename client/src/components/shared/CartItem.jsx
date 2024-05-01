/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { removeFromCart, decreaseQuantity, increaseQuantity } from "@/slices/cartSlice";
import { useState } from "react";
import { Image } from "react-bootstrap"
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa"
import { useDispatch } from "react-redux";



const CartItem = ({item}) => {
  
    const dispatch  = useDispatch()
    const handleIncrease = () => {
        dispatch(increaseQuantity({ sizeState: item.sizeState,_id: item._id }));
      };
    
      const handleDecrease = () => {
        dispatch(decreaseQuantity({ sizeState: item.sizeState,_id: item._id }));
      };
      const handleRemove = ()=> {
         dispatch(removeFromCart( { sizeState: item.sizeState ,_id: item._id} ))
      }
  return (
    <div className="bg-white border border-[#ddd] p-2 rounded-lg flex items-center justify-between flex-wrap ">
        <div className="w-[120px] h-[120px] rounded-xl bg-[#f5f5f5] m-3 mb-1  flex items-center justify-center
        
        ">
               <Image fluid src={item.images[0]} className="object-cover rounded-xl w-[100%] h-[100%]" />
        </div>
          <div className="flex-1 w-full flex p-3 flex-col gap-2 h-full ">
               <p className="text-[333] font-medium text-[15px]  ">{item.name} </p>
               <p className="text-gray-500 text-sm font-normal lg:block hidden  ">Vendu par <span className="font-bold cursor-pointer text-[#00afaa] hover:underline ">L3chir</span></p>
                {item.type === "food" && (
                  <>
 <p className="text-gray-500 text-sm font-normal  ">size: <span className="font-bold cursor-pointer text-[#00afaa] hover:underline">{item.sizeState} </span></p>
 <p className="text-gray-500 text-sm font-normal  ">extra suppléments:  <span>
 {item.extras.map((item ,i)=> (
     <span className="font-bold cursor-pointer text-[#00afaa] hover:underline" key={i}> {item.text}, </span>))}
  </span>  
 </p>
 </>
                )}
              
          </div>
           {/* desktop */}
           <div className="sm:flex hidden flex-col justify-end mx-3 items-end gap-2">
               <FaTrash onClick={handleRemove} className="cursor-pointer" color="red" />
               <div className="flex items-center justify-between mb-2 border border-[#ddd] px-3 py-1 rounded-xl w-[140px]">
                      <FaMinus
                      onClick={() => handleDecrease(item)}
                        size={14}
                        className="cursor-pointer"
                        color="#00afaa"
                      />
                      <p className="font-semibold text-black">{item.quantity}</p>
                      <FaPlus
                      onClick={() => handleIncrease(item)}
                        size={14}
                        className="cursor-pointer"
                        color="#00afaa"
                      />
                    </div>
               <p className="font-bold text-[20px] text-[#00affa] ">Dh{(item.price * item.quantity).toFixed(2)} </p>
           </div>
            {/* desktop ends */}
             {/* mobile */}
               <div className="sm:hidden mt-3 w-full flex items-center justify-between mx-3">
               <div className="flex items-center justify-between mb-2 border border-[#ddd] px-3 py-1 rounded-xl w-[140px]">
                      <FaMinus
                      onClick={() => handleDecrease(item)}
                        size={14}
                        className="cursor-pointer"
                        color="#00afaa"
                      />
                      <p className="font-semibold text-black">{item.quantity}</p>
                      <FaPlus
                       onClick={() => handleIncrease(item)}
                        size={14}
                        className="cursor-pointer"
                        color="#00afaa"
                      />
                    </div>
                    <p className="font-bold text-[20px] text-[#00affa] ">Dh{(item.price * item.quantity).toFixed(2)} </p>
                    <FaTrash onClick={handleRemove} className="cursor-pointer" color="red" />
               </div>
              {/* mobile ends */}
    </div>
  )
}

export default CartItem