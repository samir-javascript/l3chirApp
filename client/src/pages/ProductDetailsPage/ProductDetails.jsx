/* eslint-disable no-unused-vars */
 /* eslint-disable react/no-unescaped-entities */
 /* eslint-disable react/no-unescaped-entities */
 import Rating from "@/components/shared/Rating";
 import { useEffect, useState } from "react";
 import { Image } from "react-bootstrap"
 import { FaHeart, FaMinus, FaPlus, FaRegHeart, FaShippingFast } from "react-icons/fa"
 import { Link, useParams } from "react-router-dom"
  import  {MdOutlineShoppingCart} from 'react-icons/md'
import { useGetProductByIdQuery } from "@/slices/ProductsApiSlice";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/slices/cartSlice";
import { toast } from "@/components/ui/use-toast";
  
 const ProductDetails = () => {
 
  const {id} = useParams()
  const [selectedImage,setSelectedImage] = useState("")
  const [thumbnailImages,setThumbnailImages] = useState([])
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch()
  const [extras, setExtras] = useState([]);
  const {data:product, isLoading,isErrror} = useGetProductByIdQuery(id)
  const [sizeState,setSizeState] = useState(product?.prices[0]?.size || 'small')
  const [price,setPrice] = useState(product?.type === "food" ?  product?.prices[0].price :  product?.price)
   
   const [showFullDescription, setShowFullDescription] = useState(false);
   const pro = false;
   // 
   useEffect(() => {
    // Check if product and product.images are available
    if (product && product.images && product.images.length > 0) {
      setThumbnailImages(product.images);
      setPrice( product?.type === "food" ?  product?.prices[0].price :  product?.price)
      setSelectedImage(product.images[0]);
    }
  }, [product]);
  console.log(product, "product")
  const handleThumbnailClick = (thumbnail) => {
    setSelectedImage(thumbnail);
  };
  // const sizes = [
  //   {
  //     value: "small",
  //     label: "Small",
  //   },
  //   {
  //     value: "medium",
  //     label: "Medium",
  //   },
  //   {
  //     value: "large",
  //     label: "Large",
  //   }
  // ]

  useEffect(() => {
    // Calculate total price when component mounts or when extras change
    calculateTotalPrice();
  }, [sizeState, extras]);

  const calculateTotalPrice = () => {
    let total = 0;

    // Add base price of selected pizza size
    const selectedSize = product?.prices?.find((p) => p.size === sizeState);
    if (selectedSize) {
      total += selectedSize.price;
    }

    // Add prices of selected extras
    extras.forEach((extra) => {
      total += extra.price;
    });

    // Set the calculated total price
    setPrice(total);
  };

  const handleSize = (sizeIndex, item) => {
    setSizeState(item.size);
    // Update the price based on the selected size and extras
    calculateTotalPrice();
  };

  const handleChange = (e, item) => {
    const checked = e.target.checked;
    if (checked) {
      setExtras((prev) => [...prev, item]);
    } else {
      setExtras((prev) => prev.filter((extra) => extra._id !== item._id));
    }
    // Update the price based on the selected extras
    calculateTotalPrice();
  };
  
  const increase = ()=> {
     setQuantity(prev => prev + 1)
  }
  const decrease = ()=> {
    if(quantity === 1) return;
    setQuantity(prev => prev - 1)
 }
 const totalPrice = quantity * price;
 const handleAddToCart = ()=> {
     dispatch(addToCart(product.type === "food" ? {...product,price,quantity,extras,sizeState,totalPrice} :{...product,price,quantity,extras,totalPrice}))
     toast({
      title: "Product added to cart",
      
     })
 }
   if(isLoading) return "Loading..."
   if(isErrror) return "Error"
   return (
     <div className="flex flex-col py-5 w-full relative ">
          <Link className=" max-w-[1400px] sm:mx-[50px] mb-5 mx-[15px] " to='/'>
             <p className="text-[#00afaa] w-fit font-medium hover:underline "> Accueil</p>
          </Link>
          <div className="flex items-center lg:items-start lg:flex-row lg:justify-start justify-center
           flex-col gap-12 pb-4 max-w-[1200px] mx-auto ">
                <div className="sm:mx-[30px] mx-[10px] ">
                      <Image className="w-full h-[500px] max-h-[100%] object-cover 
                       lg:w-[450px] flex-1 rounded-[20px] items-center justify-center
                        " src={selectedImage} />
                        <div className="max-w-full flex items-center justify-center mt-4 space-x-4">
                          {thumbnailImages.length >= 3 && (
 thumbnailImages.map((item, index) => (
  <Image
    key={index + item}
    width={100} height={100}
    loading="lazy"
    className={`sm:w-[100px] object-cover sm:h-[100px] w-[110px] h-[120px]
     transition-all duration-150 rounded-[10px] cursor-pointer border border-gray-300`}
    src={item}
    onClick={() => handleThumbnailClick(item)}
    alt={product.name}
  />
))
                          )}
              
             </div>
                </div>
                <div className="flex-1 flex flex-col mx-[30px] ">
          
             <div className="flex items-center gap-10">
             <h2
               style={{ color: "hsl(220, 13%, 13%)" }}
               className="lg:text-[30px] text-[15px] font-semibold
                lg:leading-[50px] leading-[30px] mb-[15px] capitalize 
                sm:max-w-[600px] text-left max-w-[400px] flex-1"
             >
              {product.name}
             </h2>
             <div  className='sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center sm:bg-[#ddd] '>
               {pro ? <FaHeart size={35} color='red' className=' cursor-pointer' /> : 
               <FaRegHeart size={35} color='#0b4d54' className=' cursor-pointer' />
               } 
             </div>
           </div> 
         
          
             <div className="mb-2">
             <Rating value={product.rating} text={product.numOfReviews} />
           </div>
           <p className="font-normal text-[16px]">Marque: <Link to={`/`} className="text-[#00afaa] font-bold hover:underline"> l3chir </Link></p>
           <div className="flex gap-2 items-start sm:w-[400px] w-fit justify-start bg-[#ddd]  p-2 rounded-[5px] mt-4">
             <FaShippingFast />
             <p className="max-w-xl font-normal text-sm ">Livraison entre <span className="font-extrabold ">25min</span> à <span className="font-extrabold">40min <br className="lg:block hidden" /> gratuitment.</span></p>
           </div>
           <p style={{ color: "hsl(220, 13%, 13%)" }} className="font-normal text-[16px] sm:max-w-[500px] leading-7 my-4">
             <p style={{ color: 'hsl(220, 13%, 13%)' }} className="font-semibold">À propos de cet article :</p>
             <>
               {showFullDescription ? product.description :
                `${product.description.slice(0, 150)}...`}
               
               <button
                 onClick={() => setShowFullDescription(!showFullDescription)}
                 className="text-[#00afaa] font-semibold ml-2 focus:outline-none hover:underline"
               >
                 {showFullDescription ? 'Show Less' : 'Read More'}
               </button>
             </>
           </p>
           {product.type === "food" && (
 <div className="mb-3">
 <p className="font-medium text-black text-[16px] ">select size:</p>
 <div className="flex items-center gap-3">
   {product?.prices && product?.prices?.map((item,i)=> (
<Button onClick={()=> handleSize(i,item) } key={item._id} className={`${sizeState === item.size ? "bg-[#00afaa] text-white" : "bg-transparent"} hover:bg-initial border border-[#0aafaa] capitalize rounded-xl`} type="button">
{item.size}
</Button>
   ))}
    
    
 </div>
 <div className="mt-3">
    <p className="font-medium text-black text-[16px] mb-1">Avez-vous besoin d'un supplément ?:</p>

    {product.extraOptions && (
       <div className="flex items-center gap-3 flex-wrap">
            {product.extraOptions.map((item)=> (
               <div className="flex items-center gap-1 " key={item._id}>
                    <input onChange={(e)=> handleChange(e,item)}
                    type="checkbox" checked={extras.some((extra) => extra._id === item._id)} />
                    <p className="text-sm font-medium leading-[1.7] "> {item.text} </p>
               </div>
            ))}
       </div>
    ) }
   
 </div>
</div>
           )}
          
           <div className="flex sm:flex-col max-md:items-center max-md:justify-between">
             <div className="flex items-center space-x-6">
               <h3 style={{ color: "hsl(220, 13%, 13%)" }} className="font-semibold text-[30px] ">
                 Dh{price?.toFixed(2) * quantity}
               </h3>
               <span
                 style={{ backgroundColor: "hsl(25, 100%, 94%)", color: "hsl(26, 100%, 55%)" }}
                 className=" rounded-md font-medium text-[18px] px-2"
               >
                 50%
               </span>
             </div>
             <p style={{ color: "hsl(219, 9%, 45%)" }} className="line-through font-medium text-[18px] ">
               Dh{product.prevPrice }
             </p>
           </div>
           {/* here */}
              
           {/* ends */}
           <div className="flex w-full sm:flex-row flex-col sm:items-center mt-8 sm:space-x-6
            sm:space-y-0 space-y-6">
             <div style={{ backgroundColor: "hsl(0, 0%, 95%)" }} className="flex items-center
              justify-between px-4 h-[50px] py-2.5 rounded-md flex-1">
               <FaMinus onClick={decrease}  className="cursor-pointer hover:opacity-[0.6]" />
               <p className="font-semibold text-black ">
                 {quantity}
               </p>
               <FaPlus  onClick={increase}  className="cursor-pointer hover:opacity-[0.6]" />
             </div>
             <button
                onClick={handleAddToCart}
               id='cartSlide-btn'
              
               type="button"
               style={{ backgroundColor: "#00afaa" }}
               className="flex-1 flex items-center whitespace-nowrap text-white h-[40px]
                justify-center gap-x-6 rounded-md transition-all duration-200 hover:opacity-[0.7] py-3"
             >
               <MdOutlineShoppingCart color='white' size={30} className="sm:hidden block" />
               <p className="capitalize font-semibold text-white text-[16px] ">
                Add to cart
               </p>
             </button>
           </div>
          </div>
          </div>
       
     </div>
   )
 }

 export default ProductDetails

