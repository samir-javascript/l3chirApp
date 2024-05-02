
import Rating from "../shared/Rating";
import { Skeleton } from "../ui/skeleton";

const ProductDetailsSkeleton = () => {
  return (
    <div className="w-full h-full py-20 ">
      <div className="flex items-center lg:items-start lg:flex-row lg:justify-start justify-center flex-col gap-12 pb-4 max-w-[1200px] mx-auto">
        <div className="sm:mx-[30px] mx-[10px]">
          <Skeleton
            className="w-full max-sm:w-[95%] h-[500px] max-h-[100%] object-cover lg:w-[450px] flex-1 rounded-[20px] bg-gray-100 items-center justify-center"
          />
          <div className="max-w-full flex items-center justify-center mt-4 space-x-4">
            {[0, 1, 2].map((_, index) => (
              <Skeleton
                key={index}
                width={100}
                height={100}
               
                className={`sm:w-[100px] object-cover sm:h-[100px] w-[110px] h-[120px] transition-all duration-150 rounded-[10px] bg-gray-100 cursor-pointer border border-gray-300`}
              />
            ))}
          </div>
        </div>

        {/* content direction */}

        <div className="flex-1 w-full px-4 flex flex-col mx-[30px]">
          

          <div className="my-2 ">
            <Rating value={4} text={2} />
          </div>
          <Skeleton className="rounded-md bg-gray-100 mb-2 max-w-[450px] h-6" />
          <Skeleton className="rounded-md bg-gray-100 max-w-[350px] h-6" />

          <div className="flex flex-col mt-5 gap-2">
            <Skeleton className="rounded-md bg-gray-100  w-[95%] h-6" />
            <Skeleton className="rounded-md bg-gray-100   w-[95%] h-6" />
            <Skeleton className="rounded-md bg-gray-100  w-[95%] h-4" />
            <Skeleton className="rounded-md bg-gray-100  w-[95%] h-4" />
          </div>
          <div className=" flex  w-full sm:flex-row flex-col sm:items-center mt-8 sm:space-x-6
            sm:space-y-0 space-y-6">
                <Skeleton className="bg-gray-100 h-[50px] rounded-md w-full " />

                <Skeleton  className="bg-gray-100 h-[50px] rounded-md w-full "/>
          </div>
        </div>
      
      </div>

      <div className="flex sm:flex-col max-md:items-center max-md:justify-between">
        <div className="flex items-center space-x-6">
          <Skeleton className="h-6 rounded-md max-w-[400px] bg-gray-100" />
          <Skeleton className="rounded-md bg-gray-100 max-w-[350px] h-6" />
        </div>
       
      </div>
     
    </div>
  );
};

export default ProductDetailsSkeleton;
