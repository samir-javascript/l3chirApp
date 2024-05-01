/* eslint-disable react/prop-types */
import {
  Pagination as Paginate,
  PaginationContent,
  
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"

const Pagination = ({pages,page}) => {
  const navigate = useNavigate()
  const paginateNext = ()=>  {
     if(page === pages)  return
      navigate(`?pageNumber=${page + 1}`)
  }
  const paginatePrev = ()=>{
    if(page <= 1)  return;
    navigate(`?pageNumber=${page - 1}`)
    
    
  }
  return (
    <Paginate className="my-3">
      <PaginationContent>
        <Button disabled={page === 1} onClick={paginatePrev} type="button" className="bg-[#00afaa] text-white rounded-[5px] font-medium text-base  w-[120px]  ">
          <PaginationPrevious   />
        </Button>
       
       <div className="border rounded-[5px] p-2 px-3 mx-3 ">
          <p className="text-white font-bold text-xl ">{page} </p>
       </div>
       
       
        <Button disabled={page === pages} onClick={paginateNext} type="button" className="bg-[#00afaa] text-white rounded-[5px] font-medium text-base w-[120px] ">
          <PaginationNext  />
        </Button>
      </PaginationContent>
    </Paginate>
  )
}

export default Pagination