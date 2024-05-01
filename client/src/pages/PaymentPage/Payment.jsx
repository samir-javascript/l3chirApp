/* eslint-disable no-unused-vars */
import { useGetOrderByIdQuery } from "@/slices/ordersApiSlice"
import { Link, useParams } from "react-router-dom"
import logo from "@/assets/logol3chir2.jpg"
import { FaCheck, FaShoppingCart } from "react-icons/fa"
import { useSelector } from "react-redux"
// eslint-disable-next-line no-unused-vars
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle } from "@/components/ui/alert"

  
import { Accordion, Image } from "react-bootstrap"
const Payment = () => {
    const { id } = useParams()
    const {userInfo} = useSelector(state  => state.auth)
    const  { data, isLoading, isError} = useGetOrderByIdQuery(id)
    if(isLoading) return "Loading..."
    if(isError) return 'Error happened'
    console.log(data,"order")
  return (
    <div className="h-screen w-full  relative">
        <div className="max-w-[1400px] mx-auto">
              <div className="flex h-full  w-full lg:flex-row flex-col gap-4">
                   {/* colomn 1 */}
                
                   
                    <div className="flex lg:px-5 px-2 py-5 lg:py-10 flex-1 flex-col">
                         <div className="w-full mb-4  flex items-center justify-center">
                             <img className="w-[120px] h-auto object-contain " src={logo} alt="l3chir" />
                         </div>
                         <Accordion className="lg:hidden block mb-5" defaultActiveKey="0">
      <Accordion.Item eventKey="0">
      <Accordion.Header className="w-full !bg-[#fafafa] border-t border-b border-[#e6e6e6] flex items-center justify-between">
      
                   <div className="flex items-center gap-3">
                        <FaShoppingCart color="#00afaa" size={26} />
                       <div className="flex flex-col gap-1">
                       <p className="text-base capitalize ">afficher la sammurer du votre commande</p>
                       <p className="font-medium leading-[140%] ">Dh{data.orderItems.reduce((acc,item)=> acc + item.price * item.quantity, 0).toFixed(2)}</p>
                       </div>
                   </div>
            
      </Accordion.Header>
             
       
        <Accordion.Body className="!m-0 !p-0 ">
        <div className="flex py-4 h-full bg-[#ffe6d7]  flex-1">
                    <div className="flex flex-col gap-3">
                  {data.orderItems.map(item => (
                     <div className=" p-2   rounded-[10px]  " key={item._id}>
                          <div className="lg:flex hidden gap-3 items-start">
                               <div className="bg-white w-[100px] h-[100px] rounded-[10px] flex items-center justify-center
                                  
                               ">
                                  <Image className="object-cover rounded-[10px] w-full h-full" src={item.images[0]} fluid />
                               </div>
                               {/* for desktop */}
                                 <div className="flex   flex-1 flex-col justify-between h-full ">
                                   <div>
                                   <p className="text-[#121212] font-semibold text-sm ">{item.name} </p>
                                      <p className="font-normal text-gray-400 leading-[1.7] text-sm  ">size : <span className="text-[#0aafaa] font-bold hover:underline ">{item.sizeState} </span> </p>
                                      <p className="text-gray-400 text-sm font-normal  ">extra suppléments:  <span>
 {item.extras.map((item ,i)=> (
     <span className="font-bold cursor-pointer text-[#00afaa] hover:underline" key={i}> {item.text}, </span>))}
  </span>  
 </p>
                                       <p className="font-normal text-gray-400 leading-[1.7] text-sm  ">Qty: {item.quantity} </p>
                                   </div>
                                       <div>
                                           <p className="text-[#121212] mt-2 font-semibold text-base ">Dh{item.price.toFixed(2)} </p>
                                       </div>
                                 </div>
                               {/* for desktop ends */}
                               
                          </div>
                          { /* for mobile */}
                          <div className="flex lg:hidden gap-3 items-start">
                               <div className=" w-[100px] h-[100px] rounded-[10px] flex items-center justify-center
                                   border border-[#333]
                               ">
                                  <Image className="object-cover rounded-[10px] w-full h-full" src={item.images[0]} fluid />
                               </div>
                               {/* for desktop */}
                                 <div className="flex lg:hidden  flex-1 flex-col justify-between h-full ">
                                   
                                       <p className="text-[#121212] font-semibold text-sm ">{item.name} </p>
                                       <div className="flex mt-2 items-center justify-between">
                                            <div>
                                            <p className="font-normal text-gray-400 leading-[1.7] text-sm  ">size : <span className="text-[#0aafaa] font-bold hover:underline ">{item.sizeState} </span> </p>
                                            <p className="text-gray-500 text-sm font-normal  ">extra suppléments:  <span>
 {item.extras.map((item ,i)=> (
     <span className="font-bold cursor-pointer text-[#00afaa] hover:underline" key={i}> {item.text}, </span>))}
  </span>  
 </p>
                                       <p className="font-normal text-gray-600 leading-[1.7] text-sm  ">Qty: {item.quantity} </p>
                                            </div>
                                            <div>
                                           <p className="text-[#121212] mt-2 font-semibold text-base ">Dh{item.price.toFixed(2)} </p>
                                       </div>
                                     
                                       </div>
                                 </div>
                               {/* for desktop ends */}
                               
                          </div>
                        
                               { /** for mobile ends */}
                     </div>
                  ))}
                 <div className=" p-2 rounded-[10px] flex flex-col ">
                  <div className="border-b border-gray-300 pb-3 flex items-center justify-between ">
                      <p className="font-semibold text-[#333] text-base ">Sous-total: </p>
                      <p className="font-semibold text-black text-base">Dh{data.orderItems.reduce((acc,item)=> acc + item.price * item.quantity, 0).toFixed(2)}</p>
                  </div>
                  <div className="border-b mt-3 border-gray-300 pb-3 flex items-center justify-between ">
                      <p className="font-semibold text-[#333] text-base capitalize ">total: </p>
                      <p className="font-semibold text-black text-base">Dh{data.orderItems.reduce((acc,item)=> acc + item.price * item.quantity, 0).toFixed(2)}</p>
                  </div>
                    <p className="font-bold text-[#121212] mt-3 text-base ">Paiement à la livraison.</p>
                    <Alert className="bg-green-500 !p-3 text-white mt-2 rounded-[4px] ">
  
  <AlertTitle className="leading-[140%] text-[15px] ">Nous livrons actuellement sur Meknès exclusivement et Gratuitement, merci de votre compréhension.</AlertTitle>
  
</Alert>

                 </div>
             </div>
                    </div>
        </Accordion.Body>
      </Accordion.Item>
     
    </Accordion>
                         <div className="flex items-center gap-3">
                            <div className="w-[50px] h-[50px] rounded-full border border-[#00afaa] flex items-center justify-center ">
                            <FaCheck color="#00afaa" size={24} />
                            </div>
                            
                             <div className="flex flex-col">
                                 <p className="font-normal text-sm leading-[140%] text-gray-400 ">Confirmation n° {data._id} </p>
                                 <p className="font-semibold text-[#232323] text-[25px] ">Merci, {data.shippingAddress.firstName} !</p>
                             </div>
                         </div>
                         <div className="flex flex-col w-full rounded-[10px] p-3 border border-[#00afaa] mt-3 ">
                            <h2 className="font-medium text-[26px] mb-4 ">Détails de la commande</h2>
                            <div className="w-full flex items-start gap-6 justify-between">
                                 <div className="flex-1 gap-3 flex-col flex">
                                        
                                     <div className="flex flex-col gap-2">
                                         <p className="font-semibold text-base text-black ">Coordonnées</p>
                                         <p className="font-normal text-sm text-gray-500 ">{userInfo.email} </p>
                                     </div>
                                     <div className="flex flex-col gap-2">
                                         <p className="font-semibold text-base text-black ">Adresse de livraison</p>
                                         <p className="font-normal text-sm text-gray-500 "> <span className="font-semibold text-black">Customer FullName:</span>  {data.shippingAddress.firstName} {data.shippingAddress.lastName} </p>
                                         <p className="font-normal text-sm text-gray-500 "> <span className="font-semibold text-black">Customer Address:</span>   {data.shippingAddress.address} </p>
                                         <p className="font-normal text-sm text-gray-500 "> <span className="font-semibold text-black">Customer PhoneNumber:</span>   {data.shippingAddress.phoneNumber} </p>
                                         <p className="font-normal text-sm text-gray-500 "> <span className="font-semibold text-black">Customer Email :</span>   {userInfo.email} </p>
                                     </div>
                                 </div>
                                 <div className="flex-1 gap-3 flex-col flex">
                                        
                                     <div className="flex flex-col gap-2">
                                         <p className="font-semibold text-base text-black ">Moyen de paiement</p>
                                         <p className="font-normal text-sm text-gray-500 "> Paiement à la livraison <span className="font-semibold text-black">- {data.totalPrice} Dh</span>  </p>
                                     </div>
                                     <div className="flex flex-col gap-2">
                                         <p className="font-semibold text-base text-black ">Adresse de facturation</p>
                                         <p className="font-normal text-sm text-gray-500 ">  {data.shippingAddress.firstName} {data.shippingAddress.lastName} </p>
                                         <p className="font-normal text-sm text-gray-500 ">    {data.shippingAddress.address} </p>
                                         <p className="font-normal text-sm text-gray-500 ">  {data.shippingAddress.phoneNumber} </p>
                                         <p className="font-normal text-sm text-gray-500 ">   {userInfo.email} </p>
                                     </div>
                                 </div>
                            </div>
                         </div>
                         <Link className="mt-5" to='/'>
                         <Button className='bg-[#00afaa] rounded-[5px] hover:bg-initial hover:scale-[1.02] transition-all duration-200 text-white ' type="button">
                         Retour à la boutique
                         </Button>
                         </Link>
                        
                    </div>
                    {/* colomn 2 */}
                    <div className="lg:flex hidden py-10 h-screen bg-[#ffe6d7] px-2 lg:px-5 flex-1">
                    <div className="flex flex-col gap-3">
                  {data.orderItems.map(item => (
                     <div className=" p-2   rounded-[10px]  " key={item._id}>
                          <div className="lg:flex hidden gap-3 items-start">
                               <div className="bg-white w-[100px] h-[100px] rounded-[10px] flex items-center justify-center
                                  
                               ">
                                  <Image className="object-cover rounded-[10px] w-full h-full" src={item.images[0]} fluid />
                               </div>
                               {/* for desktop */}
                                 <div className="flex   flex-1 flex-col justify-between h-full ">
                                   <div>
                                   <p className="text-[#121212] font-semibold text-sm ">{item.name} </p>
                                      <p className="font-normal text-gray-400 leading-[1.7] text-sm  ">size : <span className="text-[#0aafaa] font-bold hover:underline ">{item.sizeState} </span> </p>
                                      <p className="text-gray-400 text-sm font-normal  ">extra suppléments:  <span>
 {item.extras.map((item ,i)=> (
     <span className="font-bold cursor-pointer text-[#00afaa] hover:underline" key={i}> {item.text}, </span>))}
  </span>  
 </p>
                                       <p className="font-normal text-gray-400 leading-[1.7] text-sm  ">Qty: {item.quantity} </p>
                                   </div>
                                       <div>
                                           <p className="text-[#121212] mt-2 font-semibold text-base ">Dh{item.price.toFixed(2)} </p>
                                       </div>
                                 </div>
                               {/* for desktop ends */}
                               
                          </div>
                          { /* for mobile */}
                          <div className="flex lg:hidden gap-3 items-start">
                               <div className=" w-[100px] h-[100px] rounded-[10px] flex items-center justify-center
                                   border border-[#333]
                               ">
                                  <Image className="object-cover rounded-[10px] w-full h-full" src={item.images[0]} fluid />
                               </div>
                               {/* for desktop */}
                                 <div className="flex lg:hidden  flex-1 flex-col justify-between h-full ">
                                   
                                       <p className="text-[#121212] font-semibold text-sm ">{item.name} </p>
                                       <div className="flex mt-2 items-center justify-between">
                                            <div>
                                            <p className="font-normal text-gray-400 leading-[1.7] text-sm  ">size : <span className="text-[#0aafaa] font-bold hover:underline ">{item.sizeState} </span> </p>
                                            <p className="text-gray-500 text-sm font-normal  ">extra suppléments:  <span>
 {item.extras.map((item ,i)=> (
     <span className="font-bold cursor-pointer text-[#00afaa] hover:underline" key={i}> {item.text}, </span>))}
  </span>  
 </p>
                                       <p className="font-normal text-gray-600 leading-[1.7] text-sm  ">Qty: {item.quantity} </p>
                                            </div>
                                            <div>
                                           <p className="text-[#121212] mt-2 font-semibold text-base ">Dh{item.price.toFixed(2)} </p>
                                       </div>
                                     
                                       </div>
                                 </div>
                               {/* for desktop ends */}
                               
                          </div>
                        
                               { /** for mobile ends */}
                     </div>
                  ))}
                 <div className=" p-2 rounded-[10px] flex flex-col ">
                  <div className="border-b border-gray-300 pb-3 flex items-center justify-between ">
                      <p className="font-semibold text-[#333] text-base ">Sous-total: </p>
                      <p className="font-semibold text-black text-base">Dh{data.orderItems.reduce((acc,item)=> acc + item.price * item.quantity, 0).toFixed(2)}</p>
                  </div>
                  <div className="border-b mt-3 border-gray-300 pb-3 flex items-center justify-between ">
                      <p className="font-semibold text-[#333] text-base capitalize ">total: </p>
                      <p className="font-semibold text-black text-base">Dh{data.orderItems.reduce((acc,item)=> acc + item.price * item.quantity, 0).toFixed(2)}</p>
                  </div>
                    <p className="font-bold text-[#121212] mt-3 text-base ">Paiement à la livraison.</p>
                    <Alert className="bg-green-500 !p-3 text-white mt-2 rounded-[4px] ">
  
  <AlertTitle className="leading-[140%] text-[15px] ">Nous livrons actuellement sur Meknès exclusivement et Gratuitement, merci de votre compréhension.</AlertTitle>
  
</Alert>

                 </div>
             </div>
                    </div>
              </div>
        </div>
    </div>
  )
}

export default Payment