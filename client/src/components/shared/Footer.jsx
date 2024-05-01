import { categoriesFooter, footerCols2, footercols3 } from "@/constants"
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import badge1 from '@/assets/badge1.png'
import badge2 from '@/assets/badge2.png'
import badge3 from '@/assets/badge3.png'
import badge4 from '@/assets/badge4.png'
import payment from '@/assets/paiement_x2_1.webp'
import deliveryMan from "@/assets/cd.png"
// #1c6c76
const Footer = () => {
   const  { pathname } = useLocation()
   if(pathname === "/cart" || pathname === "/shipping") return null
  return (
    <div className="w-full lg:flex hidden flex-col ">
        <div className="bg-[#e6e6e6] border-b border-[#232323]  px-6 py-2 flex flex-col w-full ">
             <p className="text-black font-semibold text-xl ">Suivez nous</p>
             <div className="flex mt-3 items-center gap-3">
                  <div  className="  border-[#232323] flex items-center justify-center  border-[2px] w-[45px] h-[45px] rounded-full ">
                         <FaInstagram size={22} color="black" />
                  </div>
                  <div  className="  border-[#232323] flex items-center justify-center  border-[2px] w-[45px] h-[45px] rounded-full ">
                         <FaFacebook size={22} color="black" />
                  </div>
                  <div  className="  border-[#232323] flex items-center justify-center  border-[2px] w-[45px] h-[45px] rounded-full ">
                         <FaYoutube size={22} color="black" />
                  </div>
             </div>
        </div>
        <div className='p-[20px]  bg-[#e6e6e6] text-black border-b border-slate-400 '>
              <div className='w-full flex justify-between flex-wrap 
          gap-x-[60px] gap-y-10 max-w-[1400px] mx-auto '>
                    <ul  className=" ">
                 <h2 className='font-semibold text-[16px] mb-3 capitalize '>categories</h2>
                 {categoriesFooter.map((item,index)=> (
                    <li key={index}>
                       <Link className='text-sm text-[#232323] font-medium hover:underline' to={item.url}>
                           {item.title}
                       </Link>
                    </li>
                 ))}
             </ul>
             <ul className="">
                 <h2 className='font-semibold text-[16px] mb-3 capitalize '>Découvrez la Marketplace</h2>
                 {footerCols2.map((item,index)=> (
                    <li key={index}>
                       <Link className='text-sm text-[#232323] font-medium hover:underline' to='/'>
                           {item}
                       </Link>
                    </li>
                 ))}
             </ul>
          <ul className='border-r  border-[#000] pr-4 h-[50%] '>
              <h2 className='font-semibold text-[16px] mb-3 capitalize '>Informations légales</h2>
              {footercols3.map((item,index)=> (
                    <li key={index}>
                       <Link className='text-sm text-[#232323] font-medium hover:underline' to="#">
                           {item}
                       </Link>
                    </li>
                 ))}
                 <button className='bg-transparent border text-[#232323] text-sm font-bold hover:underline
                  capitalize h-[35px] rounded-[20px] border-[#000] outline-none w-full mt-4 '>
                     devenir vendeur
                 </button>
          </ul>
          <ul className=' lg:mt-0 mt-8'>
                 
                 <div className='flex lg:flex-col space-y-8 flex-wrap lg:gap-x-0 gap-x-4'>
                 <h2 className='font-semibold text-[16px] mb-3 capitalize lg:block hidden '>Nos engagements</h2>
                 <li className='flex items-center gap-x-[40px] '>
                     <div className='flex items-center space-x-2'>
                          <img  className='w-[45px] h-auto object-contain invert-[100%]' src={badge1} alt="" />
                          <div className='flex flex-col gap-1'>
                             <p className='font-semibold text-[#232323] text-sm '>Produits 100%</p>
                             <p className='font-semibold text-[#232323] text-sm ' >authentiques</p>
                           </div>
                     </div>
                     <div className='flex items-center  space-x-2'>
                          <img className='w-[45px] h-auto object-contain invert-[100%]' src={badge3} alt="" />
                          <div className='flex flex-col gap-1'>
                             <p className='font-semibold text-[#232323] text-sm '>Livraison partout</p>
                             <p className='font-semibold text-[#232323] text-sm '>au Maroc</p>
                           </div>
                     </div>
                 </li>
                 <li className='flex items-center gap-x-[40px]  '>
                     <div className='flex items-center space-x-2'>
                          <img  className='w-[45px] h-auto object-contain invert-[100%] ' src={badge2} alt="" />
                          <div className='flex flex-col gap-1'>
                             <p className='font-semibold text-[#232323] text-sm '>Satisfait ou</p>
                             <p className='font-semibold text-[#232323] text-sm ' >emboursé</p>
                           </div>
                     </div>
                     <div className='flex items-center  space-x-2'>
                          <img className='w-[45px] h-auto object-contain  invert-[100%]' src={badge4} alt="" />
                          <div className='flex flex-col gap-1'>
                             <p className='font-semibold text-[#232323] text-sm '>Offre nationale et</p>
                             <p className='font-semibold text-[#232323] text-sm '>internationale</p>
                           </div>
                     </div>
                 </li>
                 <li className='flex lg:flex-col flex-wrap lg:items-start items-center lg:space-x-0 space-x-12 '>
                 <h2 className='font-semibold text-[16px] text-[#232323]  capitalize '>Modes de paiement</h2>
                
                 <img className='mt-[-20px] w-[150px] h-auto object-contain ' src={deliveryMan} alt="" />
               
            
               
                 </li>
                 </div>
                 
            </ul>
           
              </div>
           
         </div>
         <div className='w-full p-[20px] bg-[#e6e6e6] text-[#232323] '>
            <div className='max-w-[1400px] mx-auto '>
            <p className='text-[12px] font-bold text-[#232323] '>© 2024 - marjanemall - Tous droits réservés.</p>
            </div>
            
         </div>
    </div>
  )
}

export default Footer