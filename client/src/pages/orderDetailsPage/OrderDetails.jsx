import ProfileMobileTabs from "@/components/shared/ProfileMobileTabs"
import ProfileTabs from "@/components/shared/ProfileTabs"
import { useGetOrderByIdQuery } from "@/slices/ordersApiSlice"
import { Link, useParams } from "react-router-dom"
import { FaAngleLeft } from 'react-icons/fa'
import { Image } from "react-bootstrap"
import CommandeInfoMobile from "@/components/shared/CommandInfoMobile"
import { useSelector } from "react-redux"

const OrderDetails = () => {
    const {id } = useParams()
    const {data:order,isLoading,isError } = useGetOrderByIdQuery(id)
    const  { shippingAddress } = useSelector(state => state.cart)
    if(isLoading) return "Loading..."
    if(isError) return "Error"
  return (
    <div className="w-full !bg-[#f5f5f5] h-full relative">
    <div className="max-w-[1400px] mx-auto">
       <div className="lg:py-10 py-3 lg:px-5 flex lg:flex-row flex-col">
           
                 <ProfileMobileTabs />
                <ProfileTabs />
            
           
            <div className="flex-1 flex flex-col w-full gap-4 lg:ml-5">
                  <div className="border bg-white  flex flex-col border-gray-400 p-4">
                       <div className="flex items-center gap-2">
                             <Link className="text-gray-500 text-sm capitalize hover:underline" to="/">Home</Link>
                             <span className="text-gray-500 text-sm capitalize ">/</span>
                             <Link className="text-gray-500 text-sm capitalize hover:underline" to="/profile">My account</Link>
                             <span className="text-gray-500 text-sm capitalize">/</span>
                             <Link className="text-gray-500 text-sm capitalize hover:underline" to="/sales/history">Order Datails</Link>
                       </div>
                       <h2 className="text-black text-xl font-semibold ">Active order Details</h2>
                       <p className="text-gray-500 text-sm mt-2">Here you can check your order datails from price to status etc...</p>
                  </div>
                  
                <Link className="flex items-center w-fit  gap-3" to="/sales/history">
                      <FaAngleLeft color="#00afaa" />
                      <p className="w-fit underline text-[#00afaa] font-bold text-sm ">Retour aux commandes</p>
                </Link>
                <div key={order._id} className="border border-gray-400 rounded-[20px] flex flex-col ">
   <div className="bg-[rgb(211,211,211)] flex items-center  justify-between
       gap-x-8 w-full rounded-tl-[20px] rounded-tr-[20px] p-2
   ">
    
        <div className="flex items-center justify-between w-full">
             <div className="flex lg:flex-row flex-col flex-1 ">
                  <p className="font-bold text-base text-[14px] text-[#4c4c4c]  ">Effectuée le {order.createdAt.substring(0,10)} </p>
                  
             </div>
             
        </div>
   </div>
   <div>
         {order.orderItems.map((item)=> (
           <div className="flex items-start justify-between gap-x-2" key={item._id}> 
                   <div className="lg:w-[110px] lg:h-[110px] w-[120px] h-[80px] border border-gray-400 rounded-md lg:m-3 my-3 mx-1 flex items-center justify-center  ">
                         <Image src={item.images[0]} fluid className="object-cover w-full h-full rounded-md  " />
                   </div>
                   <div className="w-full flex  flex-col flex-1   lg:m-3 my-3 ">
                        <p className="font-normal text-[15px] line-clamp-2 text-[#555] ">{item.name} </p>
                      {item.sizeState && <p className="font-normal text-gray-400 leading-[1.7] text-sm  ">size : <span className="text-[#0aafaa] font-bold hover:underline ">{item.sizeState} </span> </p>}  
                        {item.extras.length > 0 &&     <p className="text-gray-400 text-sm font-normal  ">extra suppléments:  <span>
  { item.extras.map((item ,i)=> (
     <span className="font-bold cursor-pointer text-[#00afaa] hover:underline" key={i}> {item.text}, </span>))}
  </span>  
 </p>}
                                       <p className="font-normal text-gray-400 leading-[1.7] text-sm  ">Qty: {item.quantity} </p>
                   </div>
                   <div className=" justify-end items-end mr-3 my-3 flex gap-1 flex-col">
                 
                        {/* <Link to={`view/command_id/${order._id}`} type="button" className="bg-transparent px-2.5 py-1 text-[#0aafaa] border text-sm font-medium rounded-[5px] " >suivi coolis</Link>  */}
                        <div type="button" className="bg-yellow-500 text-white py-1 px-2.5 rounded-[5px] ">
                            <p className="capitalize animate-pulse text-sm font-medium">
                              {order.status}
                               </p> 
                        </div>
                        <p className="text-black font-semibold text-base ">{item.price  * item.quantity} Dh </p>
                   </div>

           </div>
         ))}
   </div>
   
</div>
  <div className="border-t border-gray-200 pt-4  max-lg:px-3 ">
          <div className="border border-gray-200 rounded-md p-3 ">
              <div className="flex flex-col border-b pb-4">
                  <div className="flex items-center justify-between">
                     <p className="font-medium text-[#333] text-base ">Sous total produits</p>
                     <p className="font-bold text-[#333] text-base ">{order.totalPrice}Dh </p>
                  </div>
                  <div className="flex items-center justify-between">
                     <p className="font-normal text-[#333] text-base ">Frais de livraison</p>
                     <p className="font-bold text-[#333] text-sm capitalize ">gratuitement </p>
                  </div>
              </div>
              <div className="flex items-center mt-2 justify-between">
                  <p className="font-medium text-[#333] text-base ">Total</p>
                  <p className="text-[#00afaa] font-bold text-xl  ">{order.totalPrice}Dh </p>
              </div>
          </div>
  </div>
         <div className="lg:flex hidden flex-col mt-3 w-full">
              <h2 className="text-black text-xl font-bold  mb-5">Informations de la commande</h2>
              <div className="flex items-start justify-between">
                   <div className="flex flex-col ">
                       <h3 className="text-base mb-1 font-bold text-[#333] ">Adresse de livraison</h3>
                       <p className="text-gray-500 text-sm font-normal ">Mr. {shippingAddress.firstName } {shippingAddress.lastName } </p>
                       <p className="text-gray-500 text-sm font-normal ">meknes, {shippingAddress.address }</p>
                       <p className="text-gray-500 text-sm font-normal ">MEKNES, 5000 Morocco</p>
                       <a href="tel:+212 (609547692)" className="text-[#00afaa] underline text-sm font-normal ">{shippingAddress.phoneNumber }</a>
                   </div>
                   <div className="flex flex-col ">
                   <h3 className="text-base mb-1 font-bold text-[#333] ">Mode de livraison</h3>
                       <p className="text-gray-500 text-sm font-normal ">Standard - Marketplace</p>
                       
                   </div>
                   <div className="flex flex-col ">
                   <h3 className="text-base mb-1 font-bold text-[#333] ">Adresse de facturation</h3>
                       <p className="text-gray-500 text-sm font-normal ">Mr. {shippingAddress.firstName } {shippingAddress.lastName }</p>
                       <p className="text-gray-500 text-sm font-normal ">{shippingAddress.address }</p>
                       <p className="text-gray-500 text-sm font-normal ">MEKNES, 5000 Morocco</p>
                       <a href="tel:+212 (609547692)" className="text-[#00afaa] underline text-sm font-normal ">{shippingAddress.phoneNumber }</a>
                   </div>
                   <div className="flex flex-col ">
                   <h3 className="text-base mb-1 font-bold text-[#333] ">Informations de paiement</h3>
                       <p className="text-gray-500 text-sm font-normal ">Paiement à la livraison</p>
                     
                   </div>
              </div>
         </div>
         <div className="block lg:hidden">
         <CommandeInfoMobile order={order} />
         </div>
        
            </div>
       </div>
    </div>
</div>
  )
}

export default OrderDetails