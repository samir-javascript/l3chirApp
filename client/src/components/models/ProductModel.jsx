/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,

} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateNewProductMutation, useUpdateProductMutation } from "@/slices/ProductsApiSlice"
import { useEffect, useState, useRef } from "react"
import { toast } from "../ui/use-toast"
import { ImageIcon } from "lucide-react"

export function ProductModel({open,setOpen,type:stateType,product,refetch}) {
    const [images,setImages] = useState([])
    //const [type,setType] = useState('')
    const [price,setPrice] = useState("")
    
    const [genre,setGenre] = useState('')
    const [name,setName] = useState("")
    const [createProduct,  {isLoading}] = useCreateNewProductMutation()
    const [updateProduct, {isLoading:updating}] = useUpdateProductMutation()
    const [description,setDescription] = useState("")
    const [category,setCategory] = useState("")
    const [smallPrice,setSmallPrice] = useState(null)
    const [mediumPrice,setMediumPrice] = useState(null)
    const [largePrice,setLargePrice] = useState(null)
    const [prevPrice,setPrevPrice] = useState(null)
    const inputFileRef = useRef()
    const formRef = useRef(null);
    useEffect(()=> {
      if(stateType === "create") {
         setPrevPrice("")
         setSmallPrice("")
         setMediumPrice('')
         setLargePrice('')
         setDescription("")
         setImages([])
         setName("")
         setCategory("")
      }

  },[stateType])
    useEffect(()=> {
        if(product) {
           setPrevPrice(product.prevPrice)
           setSmallPrice(null)
              setMediumPrice(null)
               setLargePrice(null)
           setDescription(product.description)
           setImages(product.images)
           setName(product.name)
           setCategory(product.category)
        }

    },[product])
    const uploadFileHandler = (e)=> {
        const files = e.target.files;
        transformFile(files)
       
    }
    const transformFile =  (files)=> {
         const promises = Array.from(files).map((file)=> {
           return new Promise((resolve)=> {
              const reader = new FileReader()
              reader.readAsDataURL(file)
              reader.onloadend= ()=> {
                 resolve(reader.result)
              }
           })
         })
         Promise.all(promises).then((results)=> {
            setImages(results)
         })
    }
    const handleSubmit = async(e)=> {
           e.preventDefault()
           if(stateType === "create") {
            try {
              const res = await createProduct({
                 name,
                 description,
                 smallPrice,
                 mediumPrice,
                 largePrice,
                 prevPrice,
                 category,
                 type: genre,
                 price,
                 images: images
              })
              if(res.error) {
                 toast({
                     title: "Failed to create a new product",
                     variant: "destructive"
                 })
                 return
              }
              refetch()
             setOpen(false)
              setName("")
              setDescription('')
              setImages(null)
              setSmallPrice(null)
              setMediumPrice(null)
               setLargePrice(null)
               
              setPrevPrice(null)
              setCategory("")
              

              toast({
                 title: "Product created successfuly"
              })
         } catch (error) {
               console.log(error)
         }
           }else if(stateType === "edit") {
               try {
                 const res = await updateProduct({
                  productId: product._id,
                   name,
                   description,
                   images,
                   category,
                   smallPrice,
                   mediumPrice,
                   largePrice,
                   prevPrice
                 })
                 if(res.error) {
                    toast({
                      title: "Failed to update product",
                      variant: "destructive"
                    })
                    return
                 }
                 refetch()
                 setOpen(false)
                 setName("")
                 setDescription('')
                 setImages(null)
                 setSmallPrice(null)
                 setMediumPrice(null)
                  setLargePrice(null)
                 setPrevPrice(null)
                 setCategory(null)
              
                 toast({
                    title: "Product updated successfuly"
                 })
               } catch (error) {
                console.log(error)
               }
           }
       
    }
   
    console.log(images , "preview image")
  return (
    <Dialog open={open} onOpenChange={()=> setOpen(false) }>
      
      <DialogContent className="sm:!w-[625px] lg:!w-full w-[325px] h-full overflow-y-auto  bg-white">
         <form  onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div>
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
  <option value="food">Food</option>
  <option value="jus">Jus</option>
</select>
          </div>
               <div className="flex  flex-col w-full gap-3 items-center lg:justify-between">
              <div className="space-y-1 w-full">
              <Label htmlFor="name">Product Name</Label>
              <Input required disabled={isLoading || updating} value={name} onChange={(e)=> setName(e.target.value)}
               className="rounded-[5px] w-full bg-[#f5f5f5] outline-none
                placeholder:text-gray-500 " 
              type="text" id="name"  />
            </div>
            <div className="space-y-1 w-full">
              <Label htmlFor="description">Product Description</Label>
              <Input required disabled={isLoading || updating} value={description} onChange={(e)=> setDescription(e.target.value)} className="rounded-[5px] w-full bg-[#f5f5f5] outline-none placeholder:text-gray-500 " 
              type="text" id="description" />
            </div>
               </div>
               <div className="flex  flex-col w-full gap-3 items-center lg:justify-between">
              <div className="space-y-1 w-full">
              <Label htmlFor="category">Product Category</Label>
              <Input required disabled={isLoading || updating} value={category} onChange={(e)=> setCategory(e.target.value)} className="rounded-[5px] w-full bg-[#f5f5f5] outline-none placeholder:text-gray-500 " 
              type="text" id="category"  />
            </div>
          
               </div>
               {genre === 'food' ? (
 <div className="space-y-1   w-full">
 <Label htmlFor="price">Product Prices</Label>
 <div className="flex items-center gap-1">
 <Input required disabled={isLoading || updating} value={smallPrice}
  onChange={(e)=> setSmallPrice(e.target.value)}
  placeholder="small"
   className="rounded-[5px] w-full bg-[#f5f5f5] 
   outline-none placeholder:text-gray-500 " 
 type="number" id="price" />
 <Input required disabled={isLoading || updating} value={mediumPrice}
  onChange={(e)=> setMediumPrice(e.target.value)}
  placeholder="medium"
   className="rounded-[5px] w-full bg-[#f5f5f5] 
   outline-none placeholder:text-gray-500 " 
 type="number" id="price" />
 <Input required disabled={isLoading || updating} value={largePrice}
  onChange={(e)=> setLargePrice(e.target.value)}
  placeholder="large"
   className="rounded-[5px] w-full bg-[#f5f5f5] 
   outline-none placeholder:text-gray-500 " 
 type="number" id="price" />
 </div>
 
</div>
               ): genre === "jus" && (
                <div className="space-y-1 w-full">
                <Label htmlFor="price">Product Price</Label>
                <Input required disabled={isLoading || updating} value={price} onChange={(e)=> setPrice(e.target.value)} className="rounded-[5px] w-full bg-[#f5f5f5] outline-none placeholder:text-gray-500 " 
                type="number" id="price"  />
              </div>
               )}
              
               <div className="flex  flex-col w-full gap-3 items-center lg:justify-between">
              <div className="space-y-1 w-full">
              <Label htmlFor="prevPrice">Product Prev price</Label>
              <Input required disabled={isLoading || updating } value={prevPrice} onChange={(e)=> setPrevPrice(e.target.value)} className="rounded-[5px] w-full bg-[#f5f5f5] outline-none placeholder:text-gray-500 " 
              type="number" id="prevPrice"  />
            </div>
            <div className="space-y-1 w-full">
            <label  className='font-bold text-sm leading-[140%] '
             htmlFor="name">Product Images</label>
              <input className="rounded-[5px] w-full bg-[#f5f5f5] outline-none placeholder:text-gray-500 " 
               label="Choose files"
               type='file'
               required
               ref={inputFileRef}
               
               hidden
               disabled={isLoading || updating}
                onChange={uploadFileHandler}
                multiple />
                <Button disabled={isLoading || updating} onClick={()=> inputFileRef.current.click()} type="button" className='bg-gray-100 w-full  rounded-md flex items-center gap-1 ' >
                    <ImageIcon color="#00afaa" size={30} />
                     <p className="text-[#000] text-base font-semibold capitalize ">add images</p>
                </Button>
                {images && (
                   <div className="flex items-center gap-2">
                    {images.map((img,i)=> (
                        <img key={i} className="w-[100px] h-[100px] rounded-md object-cover" src={img} alt="img" />
                    ))}
                     
                   </div>
                 
                )}
            </div>
               </div>
               <div className="w-full flex gap-2 items-center">
                    <Button disabled={isLoading || updating}  className="bg-[#0aafaa] rounded-[5px] hover:bg-initial hover:opacity-[0.90] text-white w-full  " type="submit">
                        {isLoading || updating ? "Loading..." : "Valider"}
                    </Button>
                    <Button onClick={()=> setOpen(false)} disabled={isLoading  || updating} className="bg-transparent rounded-[5px] border w-full" type="button">Annuler</Button>
               </div>

         </form>
      
      </DialogContent>
    </Dialog>
  )
}
