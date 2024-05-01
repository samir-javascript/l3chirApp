/* eslint-disable react/no-unescaped-entities */


import sign from "@/assets/signature.svg"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay  from "embla-carousel-autoplay"
import { useRef, useState } from "react"
import { Button } from "../ui/button"
import { Image } from "react-bootstrap"
import Rating from "./Rating"
import TestimoniolModel from "../models/TestimoniolModel"
import { useGetReviewsQuery } from "@/slices/shippingApiSlice"
export function SocialProof() {
  const { data, isLoading , refetch} = useGetReviewsQuery()
 
  const [open,setOpen ]= useState(false)
    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
      )
    
  //     ref={plugin} plugins={[plugin.current]} onMouseEnter={plugin.current.stop}
  // onMouseLeave={plugin.current.play} 
  
  if(isLoading) return;
  
  return (
    <div className="max-w-[1400px] my-24 mx-auto">
        <h2 className="sm:text-[45px] text-[25px] text-black font-medium font-serif  mx-3 mb-10 text-center w-full">
        Here's what my most recent clients had to say...
        </h2>
        <Carousel 
       
 //  ref={plugin} plugins={[plugin?.current]} onMouseEnter={plugin?.current?.stop}
   //onMouseLeave={plugin?.current?.play}
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full carousel max-lg:!overflow-x-hidden ">
      <CarouselContent className="-ml-1">
        {data.map((item, index) => (
            
          <CarouselItem key={index} className="pl-1 mx-3  sm:basis-1/2 lg:basis-1/3">
              <div className="max-w-[450px]  flex flex-col p-4 shadow-md mx-3 bg-[#1c6c76] rounded-lg h-[400px] ">
                    <div className="flex items-center gap-2">
                        <Image src={item?.user?.picture || "https://github.com/shadcn.png"} alt="profile" className="w-[40px] h-[40px] rounded-full object-contain " />
                       <div className="flex flex-col">
                           <p className="text-base font-bold text-white capitalize ">
                             {item?.user?.firstName || item?.name}
                           </p>
                           <p className="text-gray-300 font-medium text-sm ">
                           {item?.user?.lastName || item?.name}
                           </p>
                       </div>
                       
                    </div>
                    <div className="mt-3">
                           <p className="text-white font-medium sm:text-[17px] text-[14px] leading-[140%]  ">
                             {item?.comment}
                           </p>
                       </div>
                       <div className="mt-3">
                       <Rating value={item.rating} />
                       </div>

                       <div className="mt-3 flex-col flex gap-1">
                             <p className="text-white font-semibold text-base  ">
                               {item.name}
                             </p>
                             <div className="flex items-center gap-2">
                                  <Image src={sign} alt="signature" className="w-[70px] h-[70px] object-contain " />
                                  <p className="text-gray-300 font-medium text-sm  ">l'3chir happy's client</p>
                             </div>
                           
                       </div>
                  
              </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
     <Button onClick={()=> setOpen(true)} className="w-full rounded-[10px] mx-auto flex items-center text-base font-medium h-[50px] text-white bg-[#00afaa] justify-center max-w-[400px] mt-5 " type="button">
        Tell us about your experince with l'3chir
     </Button>
     <div>
     <TestimoniolModel refetch={refetch} open={open} setOpen={setOpen} />
     </div>
    
    </div>
  
  )
}
