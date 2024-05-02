/* eslint-disable react/no-unescaped-entities */


import { Skeleton } from '../ui/skeleton'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'


const CardSkeleton = () => {
 
  return (
    <div  className="max-w-[1500px] mt-20 mx-auto">
      <Skeleton className="w-full max-w-[1400px] max-sm:w-[95%] mx-auto h-[500px] rounded-xl bg-gray-100  " />
      <div className="max-w-6xl mx-auto">
  <Carousel
  // ref={plugin}
  // plugins={[plugin.current]}
  
  // onMouseEnter={plugin.current.stop}
  // onMouseLeave={plugin.current.play}

      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full carousel mt-5 max-lg:overflow-x-hidden "
    >
      <CarouselContent>
        {[0,1,2,3,4,5,6,7,8,9,10,11,22,16].map((_, index) => (
          <CarouselItem key={index} className="max-sm:basis-1/2 md:basis-1/4 lg:basis-1/5">
            <div  className="flex flex-col text-center gap-2 items-center">
              <div className="w-[170px] h-[170px] flex items-center justify-center rounded-full border ">
                  <div className=" border bg-[#f5f5f5] rounded-full w-full h-full p-1">
                         <Skeleton  className='w-full h-full rounded-full object-contain '
                           />
                  </div>
              </div>
              <Skeleton className='w-[50px] h-4 rounded-md ' />
                 
              
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
          <h2 className="my-10 sm:mx-14 max-sm:mx-[1.5rem]  font-bold text-[30px]  ">TODAY's SPECIALS</h2>
          <div className="flex  mb-10  items-start justify-center flex-wrap gap-3">
            {[0,1,2,4,5,6,75,8,9,12,11,23].map((_,item)=> (
             <div key={item} className="flex flex-col space-y-3">
             <Skeleton className=" bg-gray-100 w-[210px]  max-sm:w-[161px] min-h-auto h-[200px] rounded-xl" />
             <div className="space-y-2">
               <Skeleton className="h-4 w-[210px] max-sm:w-[182px] bg-gray-100 " />
               <Skeleton className="h-4 w-[180px] max-sm:w-[132px] bg-gray-100 " />
             </div>
           </div>
            ))}
            
       </div>
       </div>



  )
}

export default CardSkeleton