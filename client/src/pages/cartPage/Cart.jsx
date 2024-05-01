/* eslint-disable react/no-unescaped-entities */
import AuthModel from "@/components/models/AuthModel"
import CartItem from "@/components/shared/CartItem"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { FaShippingFast } from "react-icons/fa"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"


const Cart = () => {
    const {cartItems} = useSelector(state => state.cart)
    const { userInfo } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [open,setOpen] = useState(false)
    const handleNavigate = ()=> {
        if(!userInfo) {
           setOpen(true)
        }else {
              navigate("/shipping")
        }
    }
    const total = cartItems.reduce((acc,item)=> acc + item.price * item.quantity, 0).toFixed(2)
    // Un montant total d'achat minimum de 30dh est requis pour passer à la caisse .
  return (
    <div className="w-full h-full pt-10 pb-5 relative">
    {total <= 30 && cartItems.length > 0 && <Alert className="bg-[#FF9999] max-w-[850px] animate-pulse hover:animate-none focus:animate-none mb-5 mx-auto text-white mt-2 rounded-[4px] ">
  
                    
  <AlertTitle className="leading-[140%] text-xl ">Un montant total d'achat minimum de 30dh est requis pour passer à la caisse .</AlertTitle>
  
</Alert>}   
        <div className="max-w-[1400px] mx-auto flex flex-col ">
             <h1 className="text-black text-[35px] font-bold mx-2 mb-4 mt-3 text-left ">Mon panier</h1>
             {cartItems.length === 0 ? (
           <div className="max-w-[1400px] mx-auto min-h-full pb-[200px] ">
            <div className="flex flex-col gap-y-2 mx-3">
            <p>Aucun article dans votre panier.</p>
              <p>Cliquer <Link className="underline text-[#00afaa] " to='/'>ici</Link> pour continuer vos achats.</p>
            </div>
              
           </div> ) : (
             <div className="flex lg:flex-row flex-col">
                  <div className="w-full flex-1 flex flex-col gap-3 bg-[#f4f5f5] sm:p-5 p-2 ">
                      <div className="flex items-center justify-between">
                          <h3 className="text-[#333] text-[20px] font-bold sm:mx-2 ">Expedié depuis le Maroc juste à meknes</h3>
                          <p className="text-base font-bold whitespace-nowrap">{cartItems.reduce((acc,item)=> acc + item.quantity, 0)} produits </p>
                      </div>
                      <div className="flex flex-col gap-[15px] ">
                            {cartItems.map((item,i)=> (
                                  <CartItem key={i} item={item} />
                            ))}
                      </div>
                  </div>
                <div className="lg:w-auto  flex flex-col lg:mx-3">
                    <div className="flex flex-col    lg:w-[450px] w-full px-3 bg-black text-white rounded-lg py-8 ">
                         <div className="border-b border-[#333] pb-3 mb-[1.2rem] ">
                              <h3 className="uppercase font-serif text-[35px] font-medium  ">Summary</h3>
                         </div>
                         <div className="flex w-full mb-4 border-b border-[#333] pb-3 items-center justify-between">
                             <p className="font-semibold text-xl text-white capitalize ">subtoal:</p>
                              <p className="font-semibold text-xl text-white capitalize ">Dh{total} </p>
                         </div>
                         <div className="flex mb-4 border-b border-[#333] pb-3 items-center gap-2">
                            <FaShippingFast size={30} color='white' />
                            <p className="font-semibold text-xl text-white capitalize ">Fast and free shipping delivery</p>
                         </div>
                         <div className="flex w-full mb-4 border-b border-[#333] pb-3 items-center justify-between">
                             <p className="font-semibold text-xl text-white capitalize">total:</p>
                              <p className="font-semibold text-xl text-white capitalize ">Dh{total} </p>
                         </div>
                         <Button disabled={total <= 30 || cartItems.length < 0} onClick={handleNavigate} className="btn-color hover:bg-initial
                          hover:scale-[1.03] duration-300 transition-all  " type="button">
                              Valider la commande
                         </Button>
                    </div>
                </div>
             </div>
           )}
        </div>
        <AuthModel cart open={open} setOpen={setOpen} />
    </div>
  )
}

export default Cart