
// import burger from "@/assets/burger.png"
// import tacos from "@/assets/tacosa.png"
 import Autoplay from "embla-carousel-autoplay"
// import pizza from '@/assets/pz.webp'
// import pate from '@/assets/pat.png'
// import hummer from '@/assets/hum.png'
// import pasticio from "@/assets/pas.jpg"
// import sandwich from "@/assets/sand.webp"
// import panini from "@/assets/pan.webp"
// import jus from "@/assets/juse.webp"
// import dog from "@/assets/hote.webp"
// import boissons from "@/assets/boi.webp"
// import za3za3 from "@/assets/za3za3.png"
// import poulete from '@/assets/pou.webp'
// import salade from '@/assets/sala.webp'
// import plat from '@/assets/pl.png'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Image } from 'react-bootstrap'
import { useRef } from 'react'
import { Link } from "react-router-dom"
import { categories } from "@/constants"
export default function CategoriesSlider() {
   const plugin = useRef(
      Autoplay({ delay: 2000, stopOnInteraction: true })
    )
//  const categories = [
//     {
//        name: "tacos",
       
//        imgUrl: tacos
//     },
//     {
//        name:"pasticcio",
       
//        imgUrl: pasticio
//     },
//     {
//        name:"hummer",
       
//        imgUrl: hummer
//     },
//     {
//        name:"pizza",
       
//        imgUrl: pizza
//     },
//     {
//        name:"burger",
       
//        imgUrl: burger
//     },
//     {
//        name:"panini",
       
//        imgUrl: panini
//     },
//     {
//        name:"sandwich",
       
//        imgUrl: sandwich
//     },
//     {
//        name:"jus",
       
//        imgUrl: jus
//     },
//     {
//        name:"pates",
       
//        imgUrl: pate
//     },
//     {
//        name:"plats",
       
//        imgUrl: plat
//     },
//     {
//        name:"poulet",
       
//        imgUrl: poulete
//     },
//     {
//        name:"salade",
       
//        imgUrl: salade
//     },
//     {
//        name:"boissons",
       
//        imgUrl: boissons
//     },
//     {
//        name:"hot dog",
       
//        imgUrl: dog
//     },
//     {
//        name:"jus speciale",
       
//        imgUrl: za3za3
//     },
    
 
//  ]
  return (
    <div className="max-w-6xl mx-auto">
  <Carousel
  ref={plugin}
  plugins={[plugin.current]}
  
  onMouseEnter={plugin.current.stop}
  onMouseLeave={plugin.current.play}

      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full carousel max-lg:overflow-x-hidden "
    >
      <CarouselContent>
        {categories.map((item, index) => (
          <CarouselItem key={index} className="max-sm:basis-1/2 md:basis-1/4 lg:basis-1/5">
            <Link to={`/browse_categories?category=${item.name}`} className="flex flex-col text-center gap-2 items-center">
              <div className="w-[170px] h-[170px] flex items-center justify-center rounded-full border ">
                  <div className=" border bg-[#f5f5f5] rounded-full w-full h-full p-1">
                         <Image fluid className='w-full h-full rounded-full object-contain '
                          src={item.imgUrl} alt={item.name} />
                  </div>
              </div>
              <p className='text-gray-700 font-medium leading-[140%] capitalize '>
                 {item.name}
              </p>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
  
  )
}