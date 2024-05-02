import { FaIcons } from "react-icons/fa"
import { Skeleton } from "../ui/skeleton"


const WishlistSkeleton = () => {
  return (
    <div className="w-full">
    <div className="lg:py-10 py-3 lg:px-5 flex lg:flex-row flex-col">
    <div className="lg:flex hidden flex-col gap-3">
      <div className="border bg-white  items-center   flex flex-col border-gray-400 px-4 py-2">
      <div className="relative w-[130px] rounded-full overflow-hidden">
        <Skeleton className="rounded-full w-[130px] mb-2 h-[130px] object-cover bg-gray-100 " />
       
      </div>
        <Skeleton className="w-[100px] h-3 mb-1 rounded-md bg-gray-100 "/>
         
        <Skeleton  className="w-[60px] h-3 rounded-md  bg-gray-100" />
      </div>
      <div className="border bg-white p-3 gap-3  flex flex-col border-gray-400 ">
        {[0,1,2,3,4,5,6].map((_, i) => (
          <div key={i}>
            <div className="gap-2 flex items-center">
                <FaIcons size={20} className="text-gray-100 " />
              <Skeleton className="bg-gray-100 h-6 w-[150px] rounded-md " />
            
            </div>
           
          </div>
        ))}
       
      </div>
    </div>
    {/* profile mobile tabs */}
    <div className="flex w-full mt-2 overflow-x-scroll gap-x-[60px] px-4 lg:hidden ">
          {[0,1,2,3,4,5,6].map((_,i)=> (
            <div className="flex flex-col  gap-1 items-center text-center"  key={i}>
                  <Skeleton className={` bg-gray-100 md:w-[100px] md:h-[100px] w-[70px] h-[70px] rounded-full flex justify-center items-center`} />
                     
                   
                 
                  
            </div>
          ))}
         
    </div>
    <div className="flex-1 flex flex-col w-full max-lg:mt-5 gap-4 lg:ml-5">
   
    <div className="flex  mb-10  items-start justify-center flex-wrap gap-3">
            {[0,1,2,4,5,6,75,8,9,12,11,23].map((_,item)=> (
             <div key={item} className="flex flex-col space-y-3">
             <Skeleton className=" bg-gray-100 w-[210px]  max-sm:w-[182px] min-h-auto h-[200px] rounded-xl" />
             <div className="space-y-2">
               <Skeleton className="h-4 w-[210px] max-sm:w-[182px] bg-gray-100 " />
               <Skeleton className="h-4 w-[180px] max-sm:w-[132px] bg-gray-100 " />
             </div>
           </div>
            ))}
            
       </div>
    </div>
    </div>
    </div>
  )
}

export default WishlistSkeleton