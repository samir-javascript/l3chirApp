/* eslint-disable react/no-unescaped-entities */
import ProfileTabs from "@/components/shared/ProfileTabs"
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Link } from "react-router-dom"
import { useGetMyOrdersQuery } from "@/slices/ordersApiSlice";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Image } from "react-bootstrap";
import ProfileMobileTabs from "@/components/shared/ProfileMobileTabs";
const MyOrders = () => {
    const { userInfo } = useSelector(state => state.auth)
    const id = userInfo._id
    const {data:myOrders, isLoading,isError} = useGetMyOrdersQuery(id)
    if(isError) return 'Error'
    if(isLoading) return "Loading..."
    console.log(myOrders, "so")
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
                             <Link className="text-gray-500 text-sm capitalize hover:underline" to="/sales/history">My Orders</Link>
                       </div>
                       <h2 className="text-black text-xl font-semibold ">Active orders</h2>
                       <p className="text-gray-500 text-sm mt-2">Here you can check your orders status! Check on your package!</p>
                  </div>
                  
                {myOrders.length > 0  ? (
                    <div className="flex w-full flex-col flex-1 gap-2">
                      {myOrders.map((order)=> (
   <div key={order._id} className="border border-gray-400 rounded-[20px] flex flex-col ">
   <div className="bg-[rgb(211,211,211)] flex items-center  justify-between
       gap-x-8 w-full rounded-tl-[20px] rounded-tr-[20px] p-2
   ">
     <p className="lg:block hidden text-sm text-[#333] font-normal whitespace-nowrap ">
     N° {order._id}
     </p>
        <div className="flex items-center justify-between w-full">
             <div className="flex lg:flex-row flex-col flex-1 ">
                  <p className="font-bold text-base text-[14px] text-[#4c4c4c]  ">Effectuée le {order.createdAt.substring(0,10)} </p>
                  <p className="font-normal text-sm lg:hidden block">Total: <span className="font-medium"> Dh{order.totalPrice}</span></p>
             </div>
              <div className="flex items-center gap-4">
                <p className="font-normal text-sm lg:block hidden">Total: <span className="font-medium"> Dh{order.totalPrice}</span></p>
                 <Link to={`view/command_id/${order._id}`}>
                     <Button type="button" className='text-white max-lg:!px-3 bg-[#00afaa] rounded-[5px] ' >
                         View Details
                     </Button> 
                 </Link>
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
                        <p className="font-medium text-[15px] line-clamp-2 text-[#555] ">{item.name} </p>
                      {item.sizeState && <p className="font-normal text-gray-400 leading-[1.7] text-sm  ">size : <span className="text-[#0aafaa] font-bold hover:underline ">{item.sizeState} </span> </p>}  
                        {item.extras.length > 0 &&     <p className="text-gray-400 text-sm font-normal  ">extra suppléments:  <span>
  { item.extras.map((item ,i)=> (
     <span className="font-bold cursor-pointer text-[#00afaa] hover:underline" key={i}> {item.text}, </span>))}
  </span>  
 </p>}
                                       <p className="font-normal text-gray-400 leading-[1.7] text-sm  ">Qty: {item.quantity} </p>
                   </div>
                   <div className=" justify-end items-end mr-3 my-3 flex gap-1 flex-col">
                 
                        <Link to={`view/command_id/${order._id}`}  className="bg-transparent px-2.5 py-1 text-[#0aafaa] border text-sm font-medium rounded-[5px] " >suivi coolis</Link> 
                        <div  className={`${order.status === "delivered" ? "bg-green-400" : order.status === "out for delivery" ? "bg-[#00affa] animate-pulse" :  "bg-yellow-500 animate-pulse"}  text-white py-1 px-2.5 rounded-[5px]`}>
                            <p className="capitalize  text-sm font-medium">
                              {order.status}
                               </p> 
                        </div>
                        <p className="text-black font-semibold text-base ">{item.price  * item.quantity} Dh </p>
                   </div>

           </div>
         ))}
   </div>
</div>
       
                      ))}
                     
                    </div>
                ) : (
                     <Alert className="bg-[#FF9999] max-w-[1000px] mx-auto text-white mt-2 rounded-[4px] ">
  
                    
                     <AlertTitle className="leading-[140%] text-xl ">vous n'avez jamais encore commande.</AlertTitle>
                     
                   </Alert>
                )}

            </div>
       </div>
    </div>
</div>
  )
}

export default MyOrders