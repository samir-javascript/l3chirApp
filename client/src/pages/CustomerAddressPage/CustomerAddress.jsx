/* eslint-disable react/no-unescaped-entities */
import ProfileTabs from "@/components/shared/ProfileTabs"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"
import ProfileMobileTabs from "@/components/shared/ProfileMobileTabs"
import { useDispatch } from "react-redux"
import ShippingModal from "@/components/models/ShippingModal"
import { useState } from "react"
import { useDeleteShipping_addressMutation, useGetShipping_addressQuery } from "@/slices/shippingApiSlice"
import { toast } from "@/components/ui/use-toast"
import { clearShippingAddress } from "@/slices/cartSlice"
const CustomerAddress = () => {
    
    const [open,setOpen] = useState('')
    const { data:shipping,isLoading,isError,refetch} = useGetShipping_addressQuery()
    const dispatch = useDispatch()
    const [type,setType] = useState("")
    const [deleteShipping] = useDeleteShipping_addressMutation()
    const handleDeleteShipping = async()=> {
        try {
        if(window.confirm('are you sure you wanna remove your shipping address?')) {
         const res = await deleteShipping()
         if(res.error) {
           toast({
             title: "Failed to delete shipping",
             variant: "destructive"
           })
           return
         }
         dispatch(clearShippingAddress())
         refetch()
         toast({
           title: "your shipping address has been deleted",
          
         })
        }
        
           
           
         
        } catch (error) {
         console.log(error)
        }
     }
     if(isError) return "Error happened"
     if(isLoading) return "Loading..."
   
  return (
    <div className="w-full !bg-[#f5f5f5] h-full relative">
    <div className="max-w-[1400px] mx-auto">
       <div className="py-10 max-md:py-3 lg:px-5 flex lg:flex-row flex-col">
           
                 <ProfileMobileTabs />
                <ProfileTabs />
            
           
            <div className="flex-1 flex flex-col w-full gap-4 lg:ml-7">
                  <div className=" max-lg:mt-2 border bg-white  flex flex-col border-gray-400 p-4">
                       <div className="flex items-center gap-2">
                             <Link className="text-gray-500 text-sm capitalize hover:underline" to="/">Home</Link>
                             <span className="text-gray-500 text-sm capitalize ">/</span>
                             <Link className="text-gray-500 text-sm capitalize hover:underline" to="/profile">My account</Link>
                             <span className="text-gray-500 text-sm capitalize">/</span>
                             <Link className="text-gray-500 text-sm capitalize hover:underline" to="/customer/address">My shipping address</Link>
                       </div>
                       <h2 className="text-black text-xl font-semibold ">Active shipping address</h2>
                       <p className="text-gray-500 text-sm mt-2">Here you can check your address! edit it or delete it!</p>
                  </div>
                  
                <div className="flex max-lg:px-5 flex-col gap-4 w-full">

                      <div className="w-full border-b pb-5  border-[#ddd] ">
                            <h2 className="text-2xl font-semibold mb-8 text-black">Adresses par défaut</h2>
                            {shipping ? (
 <div className="flex lg:flex-row flex-col  items-start max-w-[880px] justify-between">
 <div className="flex flex-col gap-2">
     <h3 className="text-[#232323] font-medium text-base ">Adresse de facturation par défaut</h3>
     <div className="flex flex-col">
            <p className="text-gray-500 text-sm font-normal">Mr {shipping?.firstName} {shipping?.lastName}</p>
            <p className="text-gray-500 text-sm font-normal">{shipping?.address} </p>
            <p className="text-gray-500 text-sm font-normal">meknes , 5000 Morocco</p>
            <p className="text-gray-500 text-sm font-normal">{shipping?.phoneNumber} </p>
            
           
            <button onClick={()=> {
                setType("edit")
                setOpen(true)
            }} type="button" className="bg-transparent text-[#00afaa] font-semibold mt-3 underline text-base ">Modifier L’adresse De Facturation</button>
     </div> 
 </div>
 <div className="flex flex-col max-lg:mt-5 gap-2">
     <h3 className="text-[#232323] font-medium text-base ">Adresse de livraison par défaut</h3>
     <div className="flex flex-col">
            <p className="text-gray-500 text-sm font-normal">Mr {shipping?.firstName} {shipping?.lastName}</p>
            <p className="text-gray-500 text-sm font-normal">{shipping?.address} </p>
            <p className="text-gray-500 text-sm font-normal">meknes , 5000 Morocco</p>
            <p className="text-gray-500 text-sm font-normal">{shipping?.phoneNumber} </p>
           
           
            <button onClick={()=> {
                setType("edit")
                setOpen(true)
            }} type="button" className="bg-transparent text-[#00afaa] font-semibold mt-3 underline text-base ">Modifier L’adresse De La Livraison</button>
     </div> 
 </div>
</div>
                            ) : (
                                <div className="flex lg:flex-row flex-col  items-start max-w-[880px] justify-between">
                                    <div className="flex flex-col gap-2">
     <h3 className="text-[#232323] font-medium text-base ">Adresse de facturation par défaut</h3>
     <div className="flex flex-col">
            <p className="text-gray-500 text-sm font-normal">Vous n'avez pas specifie d'address de facturation par default</p>
            
            
           
            <div onClick={()=> {
                setType("create")
                setOpen(true)
            }} className="bg-transparent cursor-pointer text-[#00afaa] font-semibold mt-3 underline text-base ">Ajouter L’adresse De Facturation</div>
     </div> 
 </div>
 <div className="flex flex-col gap-2">
     <h3 className="text-[#232323] font-medium text-base ">Adresse de livraison par défaut</h3>
     <div className="flex flex-col">
            <p className="text-gray-500 text-sm font-normal">Vous n'avez pas specifie d'address de livraison par default</p>
            
            
           
            <div onClick={()=> {
                setType("create")
                setOpen(true)
            }} className="bg-transparent cursor-pointer text-[#00afaa] font-semibold mt-3 underline text-base ">Ajouter L’adresse De livraison</div>
     </div> 
 </div>
                                </div>
                            )}
                           
                      </div>
                      {shipping && (
 <div className="flex flex-col relative w-full">
 <div className="w-full border-b pb-3 border-[#ddd]">
 <h2 className="text-black text-2xl font-semibold mb-3 ">Saisies d’adresses supplémentaires</h2>
 <Table striped bordered responsive hover className="table-sm ">
     <thead>
          <tr>
              <td className="font-semibold whitespace-nowrap text-black text-base">Nom</td>
              <td className="font-semibold whitespace-nowrap text-black text-base">Address</td>
              <td className="font-semibold whitespace-nowrap text-black text-base">Ville</td>
              <td className="font-semibold whitespace-nowrap text-black text-base">Email address</td>
              <td className="font-semibold whitespace-nowrap text-black text-base">Téléphone</td>
              <td className="font-semibold whitespace-nowrap text-black text-base">Actions</td>
          </tr>
     </thead>
     <tbody>
          <tr>
               <th className="whitespace-nowrap font-normal text-sm text-gray-600">{shipping?.firstName} {shipping?.lastName}</th>
               <th className="whitespace-nowrap font-normal text-sm text-gray-600">{shipping?.address} </th>
               <th className="whitespace-nowrap font-normal text-sm text-gray-600">meknes</th>
               <th  className="whitespace-nowrap font-normal text-sm text-gray-600">{shipping?.user?.email} </th>
               <th className="whitespace-nowrap font-normal text-sm text-gray-600">{shipping?.phoneNumber} </th>
               <th>
                  <div className="flex items-center  gap-2">
                        <p onClick={()=> {
                         setType("edit")
                         setOpen(true)
                     }} className="text-[#00afaa] cursor-pointer font-semibold hover:underline text-base ">Modefier</p>
                        <span>|</span>
                        <p onClick={handleDeleteShipping} className="text-red-500 cursor-pointer font-semibold hover:underline text-base ">Supprimer</p>
                  </div>
               </th>
          </tr>
     </tbody>
 </Table>
 </div>
 <div> 
      <Button type="button" className="bg-[#00afaa] font-medium mt-4 text-white rounded-[5px] ">
      Ajouter une novelle address
      </Button>
 </div>
</div>
                      )}
                   
                </div>

            </div>
       </div>
    </div>
    <ShippingModal type={type} open={open} setOpen={setOpen} />
</div>
  )
}

export default CustomerAddress