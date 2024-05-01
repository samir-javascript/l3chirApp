/* eslint-disable no-unused-vars */


import { Link, useLocation } from "react-router-dom";



import { useGetWishlistItemsQuery } from "@/slices/UsersApiSlice";
import ProfileTabs from "@/components/shared/ProfileTabs";
import Card from "@/components/cards/Card";
import ProfileMobileTabs from "@/components/shared/ProfileMobileTabs";
import { Alert, AlertTitle } from "@/components/ui/alert";

const Wishlist = () => {
      const { search } = useLocation()
      const searchParams = new URLSearchParams(search)
      const page = parseInt(searchParams.get("page") || 1)
   const {data, isLoading ,isError} = useGetWishlistItemsQuery({pageNumber: page})
   if(isLoading) return 'Loading...'
   if(isError) return "Error"

 
  return (
    <div className="w-full !bg-[#f5f5f5] h-full relative">
          <div className="max-w-[1400px] mx-auto">
             <div className="py-10 lg:px-5 flex lg:flex-row flex-col">
                 
                       <ProfileMobileTabs />
                      <ProfileTabs />
                  
                 
                  <div className="flex-1 flex flex-col w-full gap-4 lg:ml-5">
                        <div className="lg:border lg:bg-white max-lg:border-t max-lg:border-[#ddd]  flex flex-col  p-4">
                             <div className="flex items-center gap-2">
                                   <Link className="text-gray-500 text-sm capitalize hover:underline" to="/">Home</Link>
                                   <span className="text-gray-500 text-sm capitalize ">/</span>
                                   <Link className="text-gray-500 text-sm capitalize hover:underline" to="/profile">My account</Link>
                                   <span className="text-gray-500 text-sm capitalize">/</span>
                                   <Link className="text-gray-500 text-sm capitalize hover:underline" to="/browse_wishlist-items">My favorite items</Link>
                             </div>
                             <h2 className="text-black text-xl font-semibold ">My favorites <span className="text-gray-500 text-sm font-normal ">- {data.wishlistProducts.length} items</span></h2>
                             <p className="text-gray-500 text-sm mt-2">These are your Favourite items. You can order them right now!</p>
                        </div>
                        {/* <h2 className="my-10 sm:mx-14 max-sm:mx-[1.5rem]  font-bold text-[30px]  ">TODAY's SPECIALS</h2> */}
          <div className="flex  mb-10  items-start lg:justify-start justify-center mt-4 flex-wrap gap-3">
            {data?.wishlistProducts.length > 0 ? data?.wishlistProducts?.map((item)=> {
                 
                  return (
                        <Card key={item._id}  product={item} />
                  )
            }): (
                  <Alert className="bg-[#FF9999] max-w-[1000px] mx-auto text-white mt-2 rounded-[4px] ">
  
                    
                  <AlertTitle className="leading-[140%] capitalize text-xl ">You have no wishlist Items in your List.</AlertTitle>
                  
                </Alert>
            )}
       </div>

                  </div>
             </div>
          </div>
    </div>
  )
}

export default Wishlist