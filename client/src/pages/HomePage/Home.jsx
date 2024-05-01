/* eslint-disable react/no-unescaped-entities */
import Card from "@/components/cards/Card"
import About from "@/components/shared/About"
import CategoriesSlider from "@/components/shared/CategorieCarousel"
import Hero from "@/components/shared/Hero/Hero"
import { SocialProof } from "@/components/shared/SocialProof"
import Specialmenu from "@/components/shared/Specialmenu"
import { useGetProductsQuery } from "@/slices/ProductsApiSlice"
import { useLocation } from "react-router-dom"

const Home = () => {
    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const pageNumber = searchParams.get("pageNumber")
  const  {data, isLoading} = useGetProductsQuery({pageNumber})
 
  if(isLoading) return "Loading..."
  return (
    <div>
       <Hero />
       <CategoriesSlider />
       <About />
       <div  className="max-w-[1500px] mx-auto">
          <h2 className="my-10 sm:mx-14 max-sm:mx-[1.5rem]  font-bold text-[30px]  ">TODAY's SPECIALS</h2>
          <div className="flex  mb-10  items-start justify-center flex-wrap gap-3">
            {data?.products?.slice(0,12).map((item)=> (
               <Card key={item._id}  product={item} />
            ))}
       </div>
       </div>
       
       <Specialmenu />
       <SocialProof />
    </div>
  )
}

export default Home