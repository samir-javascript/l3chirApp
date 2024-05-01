/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useGetUsersWithOrdersQuery } from "@/slices/UsersApiSlice"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const TopBox = () => {

    const  {data:users,isLoading,isError} = useGetUsersWithOrdersQuery()
    if(isError) return "Error"
    if(isLoading) return 'Loading...'
  
  return (
    <div className="flex flex-col w-full">
         <h2 className="text-white font-extrabold text-[26px] mb-4 ">Top customers</h2>
         <div className="flex flex-col gap-6">
        
          {users?.length > 0 ? users?.map((item)=> {
            
             return (
              <div className="flex items-center justify-between gap-1" key={item.user._id}>
                    <div className="flex items-center gap-2">
                    <Avatar>

 {item?.user?.picture ? (  <AvatarImage src={item?.user?.picture} />):(  <AvatarImage src={"https://github.com/shadcn.png"} />)} <AvatarFallback><AvatarImage src={"https://github.com/shadcn.png"} /></AvatarFallback>
</Avatar>
    <div className="flex flex-col">
       <p className="text-white font-semibold text-sm ">{item?.user?.username} </p>
       <p className="text-gray-400 font-medium text-sm  ">{item?.user?.email} </p>
    </div>
                    </div>
                    <div>
                       <p className="font-bold text-sm text-white">Dh{item?.totalAmountSpent} </p>
                    </div>
              </div>
             
          )
          }): (
             <p className="sm:mt-5 font-medium leading-[1.7] text-gray-400 text-xl ">Your customer List is still empty.</p>
          )}
           
          </div>
    </div>
  )
}

export default TopBox