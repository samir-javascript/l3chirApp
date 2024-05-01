/* eslint-disable no-unused-vars */
import AdminNavbar from "@/components/shared/AdminDashboardBoxes/AdminNavbar"
import { AdminSidebar } from "@/components/shared/AdminDashboardBoxes/AdminSidebar"
import { useState } from "react"
import { Table } from "react-bootstrap"
import image from "@/assets/burger.png"
import { FaEdit, FaTrash } from "react-icons/fa"
import { Button } from "@/components/ui/button"

import { ProductModel } from "@/components/models/ProductModel"
import { useDeleteProductMutation, useGetProductByIdQuery, useGetProductsQuery } from "@/slices/ProductsApiSlice"
import { toast } from "@/components/ui/use-toast"
import { useLocation } from "react-router-dom"
import Pagination from "@/components/shared/Pagination"
const ProductsList = () => {
  const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const pageNumber = searchParams.get("pageNumber")
  const {data, isLoading, refetch} = useGetProductsQuery({pageNumber})
   const [deleteProduct, {isLoading:deleting}] = useDeleteProductMutation()
  const [openModel,setOpenModel] = useState(false)
  const [type,setType] = useState('create')
    const [open,setOpen] = useState(false)
    const [productId,setProductId] = useState('')
    const {data:product, isLoading:fetching} = useGetProductByIdQuery(productId)
    const handleDeleteProduct = async(id)=> {
       try {
         const res = await deleteProduct({
          productId: id
         })
         if(res.error) {
            toast({
              title: "Failed to delete product",
              variant: "destructive"
            })
            return
         }
         refetch()
         toast({
          title:"Product deleted"
         })
       } catch (error) {
         console.log(error)
       }
    }
   if(isLoading || fetching) return "Loading..."
  return (
    <div className="flex w-full h-full bg-[#101538] flex-col">
    <AdminNavbar open={open} setOpen={setOpen} />
    <AdminSidebar open={open} setOpen={setOpen} />
    <div className="flex-1 mt-5 max-w-[1400px] w-full mx-auto ">
    <div className=" flex flex-col-reverse items-start w-full justify-between lg:flex-row">
        <div className="flex items-start flex-col gap-4 lg:flex-row">
              
                  <h2 className="font-bold text-white max-sm:mb-3 lg:text-[30px] text-[25px] mx-2 ">Products List </h2>
                 
               </div>
               <div className="max-sm:w-full justify-end flex sm:mt-5 max-sm:mb-5">
           
          
           <Button  onClick={()=> {
            setOpenModel(true)
            setType('create')
           }} type="button" className="bg-[#0aafaa] hover:bg-[#191e46] transition-all duration-300 mb-3 leading-[140%] mx-2
            text-white rounded-[5px] dark:bg-gradient-to-br from-gray-400 to-gray-800 min-h-[45px] ">
           Create new Product
            </Button>
        
                    
                     
                     
                   
                  </div>
        </div>
       
   
        <Table responsive striped hover bordered variant="dark"   >
             <thead>
                <tr>
                    <th className="w-fit">Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
             </thead>
             <tbody>
               {data.products.map(product => (
 <tr key={product._id}>
 <td className="w-full  flex  justify-center items-center">
     <img className="w-[70px] h-auto object-cover rounded-[8px] " src={product.images[0]} alt={product.name} />
 </td>
 <td>
     <p className=' max-sm:text-sm font-medium line-clamp-2 text-base '>
       {product.name}
     </p>
 </td>
 <td>
    <p className="text-base whitespace-nowrap font-medium">
       {product.category}
    </p>
 </td>
 <td>
    <p className="text-base whitespace-nowrap font-medium">Dh {product.type === "food" ? product.prices[0].price : product.price} </p>
 </td>
 <td>
    <div className="flex  items-center justify-center gap-3">
    <FaEdit  onClick={()=> {
      setProductId(product._id)
            setOpenModel(true)
            setType('edit')
           }} cursor="pointer" color="green" />
      <FaTrash onClick={()=> handleDeleteProduct(product._id)}  cursor="pointer"  color="red" />
    </div>
 </td>
</tr>
               ))}
               
               
             </tbody>
        </Table>
    </div>
    <Pagination page={data?.page} pages={data?.pages} />
    <ProductModel refetch={refetch} type={type} product={product} open={openModel} setOpen={setOpenModel} />
</div>
  )
}
export default ProductsList






