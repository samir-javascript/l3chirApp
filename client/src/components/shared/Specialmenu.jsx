/* eslint-disable react/no-unescaped-entities */
import { wines, cocktails } from "@/constants"
import image from "@/assets/menu.png"
import { Image } from "react-bootstrap"
import { Button } from "../ui/button"
import SpecialMenuItem from "./SpecialMenuItem"

const Specialmenu = () => {
  return (
    <div className="flex w-full flex-col special-menu items-center justify-center px-[3rem] lg:px-[6rem] py-[4rem] ">
       <div className="mb-[2rem] text-center ">
          <p className="text-white font-medium text-[25px] leading-[1.7] ">Menu that fits your pallete.</p>
          <h1 className="text-[#DCCA87] text-[35px] font-bold capitalize font-serif mt-2 whitespace-nowrap ">today's special</h1>

       </div>
       <div className="w-full my-[2rem] flex justify-center items-start lg:flex-row flex-col ">
           <div className="flex-1 w-full items-center justify-center flex flex-col">
                 <p className="font-serif capitalize text-white text-xl ">wine & beer</p>
                 <div className="flex flex-col my-[2rem] w-full ">
                      {wines.map((wine,index)=> (
                          <SpecialMenuItem price={wine.price} key={wine.title + index} title={wine.title} tags={wine.tags} />
                      ))}
                 </div>
           </div>
           {/* wine ends */}
           {/* image */}
           <div className="w-[410px] max-sm:w-[250px] max-md:mx-auto lg:mx-[2rem] md:mx-auto sm:mx-[2rem]  flex items-center justify-center  max-lg:mb-[1rem] ">
                <Image className="w-full h-auto" src={image} alt='menu' fluid />
           </div>
           {/* image ends */}
           <div className="flex-1 w-full items-center justify-center flex flex-col">
                 <p className="font-serif capitalize text-white text-xl ">wine & beer</p>
                 <div className="flex flex-col my-[2rem] w-full ">
                      {cocktails.map((cocktail,index)=> (
                           <SpecialMenuItem price={cocktail.price} key={cocktail.title + index} title={cocktail.title} tags={cocktail.tags} />
                      ))}
                 </div>
           </div>
       </div>
       <div className="mt-[1rem] ">
           <Button type="button" className="hover:!text-white font-semibold text-base bg-[#DCCA87] text-gray-700 rounded-[5px] px-8 hover:bg-[#0aafaa] ">
              view more
           </Button>
       </div>
    </div>
  )
}

export default Specialmenu
