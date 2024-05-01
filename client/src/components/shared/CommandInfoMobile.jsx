/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const CommandeInfoMobile = ({  order }) => {
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [isBillingOpen, setIsBillingOpen] = useState(false);

  const toggleAddressAccordion = () => {
    setIsAddressOpen((prev) => !prev);
  };

  const toggleBillingAccordion = () => {
    setIsBillingOpen((prev) => !prev);
  };

  return (
    <div className="w-full ">
      <h3 className="text-center font-bold text-black mb-3 text-2xl">
        Informations de la commande
      </h3>
      <div className="border border-[#ddd] rounded-[10px] flex flex-col mx-2">
        <div className="flex flex-col p-2 border-b border-[#ddd]">
          <div className="flex cursor-pointer items-center justify-between" onClick={toggleAddressAccordion}>
            <p className="underline text-[#00afaa] font-semibold text-sm">Address de livraison</p>
            {isAddressOpen ? <FaChevronUp size={16} color="#00afaa" /> : <FaChevronDown size={16} color="#00afaa" />}  
          </div>
          <div className={`mt-1 ${isAddressOpen ? 'h-auto' : 'h-0'} overflow-hidden`}>
            <p className="font-normal text-[#4c4c4c] text-[15px] mb-0.5">
              Mr. {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </p>
            <p className="font-normal text-[#4c4c4c] text-[15px] mb-0.5">
              {order.shippingAddress.address}
            </p>
            
            <p className="font-semibold text-[#00afaa] underline text-[15px] mb-0.5">
              {order.shippingAddress.phoneNumber}
            </p>
          </div>
        </div>
        <div className="flex flex-col p-2 border-b border-[#ddd]">
          <div className="flex cursor-pointer items-center justify-between" onClick={toggleBillingAccordion}>
            <p className="underline text-[#00afaa] font-semibold text-sm">Adresse de facturation</p>
          {isBillingOpen ? <FaChevronUp size={16} color="#00afaa" /> : <FaChevronDown cursor="pointer" size={16} color="#00afaa" />}  
          </div>
          <div className={`mt-1 ${isBillingOpen ? 'h-auto' : 'h-0'} overflow-hidden`}>
            <p className="font-normal text-[#4c4c4c] text-[15px] mb-0.5">
              Mr. {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </p>
            <p className="font-normal text-[#4c4c4c] text-[15px] mb-0.5">
              Meknes , {order.shippingAddress.address}
            </p>
           
            <p className="font-semibold text-[#00afaa] underline text-[15px] mb-0.5">
              {order.shippingAddress.phoneNumber}
            </p>
          </div>
        </div>
             <div className="flex items-center justify-between p-2 border-b border-[#ddd] " >
                  <p className=" text-[#4c4c4c] font-semibold text-sm ">Mode de livraison</p>
                  <p className="font-semibold text-[#4c4c4c] text-[15px] mb-0.5 ">Standard - Marketplace </p>
             </div>
             <div className="flex items-center justify-between p-2 border-b border-[#ddd] " >
                  <p className=" text-[#4c4c4c] font-semibold text-sm ">Informations de paiement</p>
                  <p className="font-semibold text-[#4c4c4c] text-[15px] mb-0.5 ">
                  Paiement à la livraison
                 </p>
             </div>
        </div>
    </div>
  )
}

export default CommandeInfoMobile