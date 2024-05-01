/* eslint-disable react/no-unescaped-entities */
import { Link, useLocation } from "react-router-dom"
import { useGetProductsByCategoryQuery } from "@/slices/ProductsApiSlice"
import { categories } from "@/constants"
import Card from "@/components/cards/Card"
const Category = () => {
    const { search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const categoryName = searchParams.get('category').toLowerCase()
  
    const {data:products, isLoading,isError} = useGetProductsByCategoryQuery(categoryName)
    console.log(products,'Products BY CATEGORY')
    const currentCategory = categories.find((item => item.name === categoryName))
    if(isLoading) return "Loading..."
    if(isError) return "Error"

  return (
    <div className="w-full h-full relative ">
      <div className="p-6 flex items-center gap-2">
            <Link className="text-[#00afaa] font-semibold text-base hover:underline " to="/">Accueil</Link> <span>&gt;</span> 
            <p className="font-normal text-gray-500 capitalize text-base ">{categoryName} </p>
      </div>
      <div className="w-full lg:h-[450px] h-[400px] ">
      <img className="w-full h-full object-cover" src={currentCategory.imgBanner} alt={currentCategory.name} />
      </div>
      <div  className="max-w-[1500px] mx-auto">
          <h2 className="my-10 sm:mx-14 max-sm:mx-[1.5rem]  font-bold text-[30px]  ">Best {categoryName}'s we got for you</h2>
          <div className="flex  mb-10  items-start lg:justify-start justify-center flex-wrap gap-3">
            {products?.map((item)=> (
               <Card key={item._id}  product={item} />
            ))}
       </div>
       </div>
    </div>
  )
}

export default Category