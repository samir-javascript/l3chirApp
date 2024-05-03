/* eslint-disable react/no-unescaped-entities */
import Card from "@/components/cards/Card"
import CardSkeleton from "@/components/Skeletons/CardSkeleton"
import About from "@/components/shared/About"
import CategoriesSlider from "@/components/shared/CategorieCarousel"
import Hero from "@/components/shared/Hero/Hero"

import { SocialProof } from "@/components/shared/SocialProof"
import Specialmenu from "@/components/shared/Specialmenu"


import { useGetProductsQuery } from "@/slices/ProductsApiSlice"
import { useLocation } from "react-router-dom"
import { Helmet } from "react-helmet-async"


const Home = () => {
    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const pageNumber = searchParams.get("pageNumber") || 1
  const  {data, isLoading, refetch} = useGetProductsQuery({pageNumber}) 
 
  if(isLoading) return <CardSkeleton />
  return (
    <div>
        <Helmet>
        <title>l3chir   </title>
      
      </Helmet>
       <Hero />
       <CategoriesSlider />
       <About />
      
        <div  className="max-w-[1500px] mt-20 mx-auto">
        <h2 className="my-10 sm:mx-14 max-sm:mx-[1.5rem]  font-bold text-[30px]  ">TODAY's SPECIALS</h2>
        <div className="flex  mb-10  items-start justify-center flex-wrap gap-3 max-sm:gap-1">
          {data && data?.products?.slice(0,12).map((item)=> (
             <Card refetch={refetch} key={item._id}  product={item} />
          ))}
          
     </div>
     </div>
       
      
      
       
             
      
      
    
       <Specialmenu />
       <SocialProof />
       
    </div>
  )
}

export default Home