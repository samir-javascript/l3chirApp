import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Alert,  AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { clearCart, saveShippingAddress } from "@/slices/cartSlice"
import { useAddNewShipping_addressMutation } from "@/slices/shippingApiSlice"
import { useCreateNewOrderMutation } from "@/slices/ordersApiSlice"
import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import { useGetShipping_addressQuery } from "@/slices/shippingApiSlice"
const Shipping = () => {
  const {cartItems} = useSelector(state => state.cart)
 // const { shippingAddress } = useSelector(state => state.cart)
 const {data:shipping,isLoading:fetching} = useGetShipping_addressQuery()
  console.log(cartItems)
  const [lastName,setLastName] = useState('')
  const [firstName,setFirstName] = useState("")
 
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [address,setAddress] = useState('')
  const [phoneNumber,setPhoneNumber] = useState(null)
  const [createOrder, {isLoading}] = useCreateNewOrderMutation()
  const [addShipping, {isLoading:loading}] = useAddNewShipping_addressMutation()
 const total = cartItems.reduce((acc,item)=> acc + item.price * item.quantity, 0).toFixed(2)
 useEffect(()=> {
    if(shipping) {
      setFirstName(shipping.firstName)
      setLastName(shipping.lastName)
      setAddress(shipping.address)
      setPhoneNumber(shipping.phoneNumber)
    }
 }, [shipping])
 if(fetching) return 'Loading...'
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Check if shippingAddress already exists
    if (!shipping) {
      const res = await addShipping({
        firstName: firstName,
        lastName: lastName,
        address: address,
        phoneNumber: phoneNumber
      });

      if (res.error) {
        toast({
          title: "Failed to add shipping address",
          description: "Please try again.",
          variant: 'destructive'
        });
        return;
      }

      dispatch(saveShippingAddress(res.data));
    }

    // Create the order
    const response = await createOrder({
      orderItems: cartItems,
      shippingAddress: {
        firstName,
        lastName,
        phoneNumber,
        address
      },
      totalPrice: total,
      status: "processing"
    });

    if (response.error) {
      toast({
        title: "Failed to create order",
        variant: "destructive"
      });
      return;
    }

    // If order creation is successful
    dispatch(clearCart());

    toast({
      title: "Your order has been received",
      description: "It'll be delivered to your address in 30 minutes"
    });

    navigate(`/payment/${response.data._id}/thank_you`, {replace: true});

  } catch (error) {
    console.log(error);
  }
}


  
  
  return (
    <div className="w-full h-full py-10">
       <div className="max-w-[1400px] mx-auto flex flex-col ">
          <div className="flex w-full mx-3 items-center gap-1">
              <Link className="text-[#00afaa] font-semibold text-base hover:underline " to="/">Home</Link>
               <span>/</span>
              <p className="text-[#232323] font-semibold text-base  ">Checkout</p>
          </div>
           <div className="flex mt-4 w-full max-w-[1200px] lg:mx-auto gap-7 lg:flex-row flex-col  ">
             <div className="flex mx-3 flex-col flex-1 mt-8">
                   <h2 className="font-bold text-black mb-3 text-[30px]  ">Détails de facturation</h2>
                   <form  className="flex flex-col gap-4" onSubmit={handleSubmit}>
                      <div className="flex flex-col gap-1">
                           <Label>Nom <span className="text-red-500">*</span></Label>
                           <Input disabled={isLoading || loading} value={firstName} onChange={(e)=> setFirstName(e.target.value)} className="rounded-[5px] bg-[#f5f5f5] outline-none placeholder:text-gray-500 " type="text" placeholder="anass"  />
                      </div>
                      <div className="flex flex-col gap-1">
                           <Label>Prénom <span className="text-red-500">*</span></Label>
                           <Input disabled={isLoading || loading} value={lastName} onChange={(e)=> setLastName(e.target.value)} className="rounded-[5px] bg-[#f5f5f5] outline-none placeholder:text-gray-500 " type="text" placeholder="hmamou"  />
                      </div>
                      <div className="flex flex-col gap-1">
                           <Label>Adresse <span className="text-red-500">*</span></Label>
                           <Input disabled={isLoading || loading} value={address} onChange={(e)=> setAddress(e.target.value)} className="rounded-[5px] bg-[#f5f5f5] outline-none placeholder:text-gray-500 " type="text"  />
                      </div>
                      <div className="flex flex-col gap-1">
                           <Label>Téléphone <span className="text-red-500">*</span></Label>
                           <Input disabled={isLoading || loading} value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} className="rounded-[5px] bg-[#f5f5f5] outline-none placeholder:text-gray-500 " type="number"  />
                      </div>
                      <Button disabled={isLoading || loading} className="bg-[#00affa] hover:bg-[#0aaffa] text-white rounded-[2px] font-medium " type="submit">
                          Commander
                      </Button>
                   </form>
             </div>
             <div className="flex flex-col mx-3 lg:ml-7 flex-1 mt-8">
             <h2 className="font-bold text-black mb-3 text-[30px]  ">Votre commande</h2>
             <div className="flex flex-col gap-3">
                  {cartItems.map(item => (
                     <div className="border p-2 border-[#333] bg-[#f5f5f5] rounded-[10px]  " key={item._id}>
                          <div className="lg:flex hidden gap-3 items-start">
                               <div className="bg-white w-[100px] h-[100px] rounded-[10px] flex items-center justify-center
                                   border border-[#333]
                               ">
                                  <Image className="object-cover rounded-[10px] w-full h-full" src={item.images[0]} fluid />
                               </div>
                               {/* for desktop */}
                                 <div className="flex   flex-1 flex-col justify-between h-full ">
                                   <div>
                                   <p className="text-[#121212] font-semibold text-sm ">{item.name} </p>
                                     {item.type === "food" &&  <p className="font-normal text-gray-400 leading-[1.7] text-sm  ">size : <span className="text-[#0aafaa] font-bold hover:underline ">{item.sizeState} </span> </p>} 
                                       <p className="font-normal text-gray-400 leading-[1.7] text-sm  ">Qty: {item.quantity} </p>
                                   </div>
                                       <div>
                                           <p className="text-[#121212] mt-2 font-semibold text-base ">Dh{item.price} </p>
                                       </div>
                                 </div>
                               {/* for desktop ends */}
                               
                          </div>
                          { /* for mobile */}
                          <div className="flex lg:hidden gap-3 items-start">
                               <div className="bg-white w-[100px] h-[100px] rounded-[10px] flex items-center justify-center
                                   border border-[#333]
                               ">
                                  <Image className="object-cover rounded-[10px] w-full h-full" src={item.images[0]} fluid />
                               </div>
                               {/* for desktop */}
                                 <div className="flex lg:hidden  flex-1 flex-col justify-between h-full ">
                                   
                                       <p className="text-[#121212] font-semibold text-sm ">{item.name} </p>
                                       <div className="flex mt-2 items-center justify-between">
                                            <div>
                                            {item.type === "food" &&  <p className="font-normal text-gray-400 leading-[1.7] text-sm  ">size : <span className="text-[#0aafaa] font-bold hover:underline ">{item.sizeState} </span> </p>} 
                                       <p className="font-normal text-gray-400 leading-[1.7] text-sm  ">Qty: {item.quantity} </p>
                                            </div>
                                            <div>
                                           <p className="text-[#121212] mt-2 font-semibold text-base ">Dh{item.price} </p>
                                       </div>

                                       </div>
                                 </div>
                               {/* for desktop ends */}
                               
                          </div>
                        
                               { /** for mobile ends */}
                     </div>
                  ))}
                 <div className="bg-[#f5f5f5] p-2 rounded-[10px] flex flex-col ">
                  <div className="border-b border-gray-300 pb-3 flex items-center justify-between ">
                      <p className="font-semibold text-[#333] text-base ">Sous-total: </p>
                      <p className="font-semibold text-black text-base">Dh{cartItems.reduce((acc,item)=> acc + item.price * item.quantity, 0).toFixed(2)}</p>
                  </div>
                  <div className="border-b mt-3 border-gray-300 pb-3 flex items-center justify-between ">
                      <p className="font-semibold text-[#333] text-base capitalize ">total: </p>
                      <p className="font-semibold text-black text-base">Dh{cartItems.reduce((acc,item)=> acc + item.price * item.quantity, 0).toFixed(2)}</p>
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

export default Shipping