/* eslint-disable no-unused-vars */
 /* eslint-disable react/no-unescaped-entities */
 /* eslint-disable react/no-unescaped-entities */
 import Rating from "@/components/shared/Rating";
 import { useEffect, useState } from "react";
 import { Col, Form, Image, ListGroup, Row } from "react-bootstrap"
 import { FaHeart, FaMinus, FaPlus, FaRegHeart, FaShippingFast } from "react-icons/fa"
 import { Link, useLocation, useParams } from "react-router-dom"
 import loader from "@/assets/loader.gif"
  import  {MdOutlineShoppingCart} from 'react-icons/md'
 
import { useGetProductByIdQuery , useAddProductReviewMutation, useGetRecommendedProductsQuery} from "@/slices/ProductsApiSlice";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/slices/cartSlice";
import {  useGetCollectionsQuery, useToogleWishlistProductMutation } from "@/slices/UsersApiSlice"
import { toast } from "@/components/ui/use-toast";
import LoadingState from "@/components/shared/Loader";
import { Alert, AlertTitle } from "@/components/ui/alert";
import Card from "@/components/cards/Card";
import AuthModel from "@/components/models/AuthModel";
import ProductDetailsSkeleton from "@/components/Skeletons/ProductDetailsSkeleton";
import { Helmet } from "react-helmet-async";
  
 const ProductDetails = () => {
 
  const {id} = useParams()
  const {userInfo} = useSelector(state => state.auth)
  const [selectedImage,setSelectedImage] = useState("")
  const [comment,setComment] = useState('')
  const [rating,setRating] = useState(null)
  const [thumbnailImages,setThumbnailImages] = useState([])
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch()
  const [extras, setExtras] = useState([]);
  const {data:product, isLoading,isErrror,refetch} = useGetProductByIdQuery(id)
  const [sizeState,setSizeState] = useState(product?.prices[0]?.size || 'small')
  const [price,setPrice] = useState(product?.type === "food" ?  product?.prices[0].price :  product?.price)
    const [toggleWishlist] = useToogleWishlistProductMutation()
   const [showFullDescription, setShowFullDescription] = useState(false);
   const [addReview, {isLoading:adding}] = useAddProductReviewMutation()
   const { data:recommendedProducts, isLoading:fetching} = useGetRecommendedProductsQuery(id)
   const { search } = useLocation()
   const [open,setOpen] = useState(false)
   const searchParams = new URLSearchParams(search)
   const page = parseInt(searchParams.get("page") || 1)
   const {data, isLoading:loading,refetch:rf} = useGetCollectionsQuery({pageNumber: page})
   const handleToggleWishlist = async()=> {
    if(!userInfo) {
        setOpen(true)
        return
    }
    try {
      const res = await toggleWishlist({
       productId: product && product?._id,
       userId: userInfo._id
      })
      if(res.error) {
        toast({
          title:"Failed to complete this action!",
          variant:"destructive"
        })
        return;
      }
      rf()
      toast({
        title: "item has been added to your favorites"
      })
    } catch (error) {
      console.log(error)
    }
  }
   useEffect(() => {
    // Check if product and product.images are available
    if (product && product.images && product.images.length > 0) {
      setThumbnailImages(product.images);
      setPrice( product?.type === "food" ?  product?.prices[0].price :  product?.price)
      setSelectedImage(product.images[0]);
    }
  }, [product]);
  // this is wrong down below,

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

  const handleAddProductReview = async(e)=> {
    e.preventDefault()
     try {
        const res = await addReview({
          productId: product._id,
          comment,
          userId: userInfo?._id,
          username: userInfo?.username,
          rating
        })
        if(res.error) {
          toast({
            title: res.error.data.message || "Failed to add review",
            variant:"destructive"
          })
          return
        }
        refetch()
        setComment('')
        setRating("")
        toast({
          title: "your review has been added"
        })
     } catch (error) {
        console.log(error)
     }
  }
   if(isLoading || loading) return <ProductDetailsSkeleton />
   if(isErrror) return <Alert className="bg-[#FF9999] max-w-[600px]  mb-5 mx-auto text-white  rounded-[4px] ">
  
                    
   <AlertTitle className="leading-[140%] text-xl ">something went wrong { " "} <Button className='border-none p-0  bg-transparent outline-none underline text-black' onClick={()=> window.location.reload()} type="button">Refresh the page</Button> </AlertTitle>
   
 </Alert>
  const pro = data?.wishlist?.productIds?.find((item)=> item === product._id);
  
  
  
  

   return (
     <div className="flex flex-col py-5 w-full relative ">
      <Helmet>
        <title>{product?.name || ""} </title>
        <meta name="description" content={product?.description || ""} />
      </Helmet>
          <Link className=" max-w-[1400px] sm:mx-[50px] mb-5 mx-[15px] " to='/'>
             <p className="text-[#00afaa] w-fit font-medium hover:underline "> Accueil</p>
          </Link>
          <div className="flex items-center lg:items-start lg:flex-row lg:justify-start justify-center
           flex-col gap-12 pb-4 max-w-[1200px] mx-auto ">
                <div className="sm:mx-[30px] mx-[10px] ">
                      <Image className="w-full h-[500px] max-h-[100%] object-cover 
                       lg:w-[450px] flex-1 rounded-[20px] items-center justify-center
                        " src={selectedImage.secure_url} />
                        <div className="max-w-full flex items-center justify-center mt-4 space-x-4">
                          {thumbnailImages.length >= 3 && (
 thumbnailImages.map((item, index) => (
  <Image
    key={index + item}
    width={100} height={100}
    loading="lazy"
    className={`sm:w-[100px] object-cover sm:h-[100px] w-[110px] h-[120px]
     transition-all duration-150 rounded-[10px] cursor-pointer border border-gray-300`}
    src={item.secure_url}
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
             <div onClick={handleToggleWishlist} className='sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center sm:bg-[#ddd] '>
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

          <div className="w-full ">
          <div  className="max-w-[1500px] mt-20 mx-auto">
        <h2 className="my-10 sm:mx-14 max-sm:mx-[1.5rem] text-center text-black  font-bold text-[30px]  ">You may also like</h2>
        <div className="flex  mb-10  items-start justify-center flex-wrap gap-3">
          {data && recommendedProducts?.slice(0,4).map((item)=> (
             <Card refetch={refetch} key={item._id}  product={item} />
          ))}
          
     </div>
     </div>
     
      <Row className='review m-3 max-w-[1400px] mx-auto'>
          <Col className="lg:mx-6 mx-2 " md={7} >
            {product?.reviews.length === 0 ? (
 <h2 className="mt-5 mb-4  font-bold text-black text-[24px] "> Reviews</h2>
            ): (
              <h2 className="mt-5 font-bold text-black text-[24px] mb-4"> 
              {product?.reviews.length > 1 ? "Reviews" :  "Review" } ({product?.reviews.length}) </h2>
            )}
             
             
              <ListGroup variant='flush'>
                  {product?.reviews.map(item => (
                     <ListGroup.Item key={item._id}>
                         <div className="flex lg:items-center items-start lg:flex-row flex-col">
                          <div className="flex items-center gap-x-4">
                              <div className=" w-[40px] h-[40px] rounded-full flex items-center justify-center ">
                                   <img alt={item.user.name} src={item.user.picture} className=" w-full h-full rounded-full "/>
                              </div>
                              <div className="flex flex-col">
                                    <Rating value={item.rating} />
                                    <p className="font-normal text-base text-[#4c4c4c] ">{item.name} </p>
                              </div>
                          </div>
                              <div className="bg-gray-100 p-2 lg:mt-0 mt-2.5 lg:ml-10 rounded-xl lg:flex-1 ">
                                  <p className="text-gray-500 text-sm font-normal">{item.comment} </p>
                                  <p className="text-sm text-gray-400 font-normal pt-1.5">{ item.createdAt.substring(0,10)} </p>
                              </div>
                         </div>
                     </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                     {userInfo ? (
                      <>
                      <h3 className="mt-5 lg:text-[22px] text-[20px] 
                       lg:whitespace-nowrap mb-3 text-black font-semibold ">Veuillez laisser votre commentaire pour ce produit.</h3>
                       <Form onSubmit={handleAddProductReview}>
                          <Form.Group controlId='rating' className='my-2'>
                             <Form.Label className="font-bold text-[22px] font-Roboto text-[#4c4c4c]">Rating</Form.Label>
                             <Form.Control  required as='select' value={rating}
                              onChange={(e)=> setRating(Number(e.target.value))} >
                                <option value="">select...</option>
                                <option value={1}>1 - poor</option>
                                <option value={2}>2 - fair</option>
                                <option value={3}>3 - good</option>
                                <option value={4}>4 - very good</option>
                                <option value={5}>5 - excellent</option>
                             </Form.Control>
                          </Form.Group>
                          <Form.Group controlId='comment' className='my-2 mt-4 '>
                             <Form.Label className="font-bold text-[22px] text-[#080606] ">Comment</Form.Label>
                             <Form.Control required as='textarea' value={comment} rows="4" className="border border-blue-500"
                             placeholder='Écrire un avis client sur l3chir'
                              onChange={(e)=> setComment(e.target.value)} >
                               
                             </Form.Control>
                          </Form.Group>
                          <Button
            disabled={adding}
            type="submit"
            className="bg-[#00afaa]  mt-2 mx-auto text-white font-bold w-[250px] h-[40px] rounded-[20px] "
          >
            {adding ?  <img src={loader} className="w-[35px] h-[35px] " alt="loading..." /> : 'valider'}
          </Button>
                       </Form>
                       </>
                     ) : (
                            
                              <Alert className="bg-green-500 max-w-[600px] mt-2 mb-5 mx-auto text-white  rounded-[4px] ">
  
                              <AlertTitle className="leading-[140%] text-base  ">Veuillez <span onClick={()=> {
                                  setOpen(true)
                              }} className="underline cursor-pointer">vous connectez</span> pour rédiger un avis. </AlertTitle>
                              
                            </Alert>
                     )}
                  </ListGroup.Item>
              </ListGroup>
          </Col>
       </Row>
       </div>
<AuthModel open={open} setOpen={setOpen} />
     </div>
   )
 }

 export default ProductDetails

