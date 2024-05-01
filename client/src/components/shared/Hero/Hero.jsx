/* eslint-disable react/no-unescaped-entities */


import { Link, useParams } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import bannerGirl from '@/assets/banner.png'
import banner from "@/assets/tacos-banner.jpg"
import banner1 from "@/assets/pizza-banner.jpg"
import banner2 from "@/assets/panini.jpg"
import { Button } from '@/components/ui/button'
const Hero = () => {
  const {keyword} = useParams()

//   const [isMobile, setIsMobile] = useState(false);
  
//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(max-width: 768px)');
//     setIsMobile(mediaQuery.matches);

//     const handleMediaQueryChange = (event) => {
//       setIsMobile(event.matches);
//     };

//     mediaQuery.addEventListener('change', handleMediaQueryChange);

//     return () => {
//       mediaQuery.removeEventListener('change', handleMediaQueryChange);
//     };
//   }, []);



 
 

  if(keyword) return null;
  
  return (
    <div className='max-w-[1400px] mx-auto relative'>
      <div className='absolute bottom-0 w-full h-[210px] max-md:h-[130px] z-20  bg' />

    <Carousel   pause='hover' className='mb-4'>
    <Carousel.Item>
               <>
                    <div className='w-full h-[500px] max-lg:h-auto flex items-start justify-between
                     lg:flex-row flex-col-reverse '>
                        <div className='w-full lg:flex hidden h-full justify-center items-start text-left px-10 flex-col'>
                              <h1 className='text-[45px] whitespace-nowrap leading-[1.7] font-bold text-black capitalize '><span className='text-orange-500'>welcome to</span> l'3chir<span className='text-orange-500 text-3xl'>.</span></h1>
                              <h3 className='text-[30px] text-black font-semibold mt-2 capitalize'>the best fast food delivery in town.</h3>
                              <p className='mt-2 text-base leading-[1.7] text-[#232323] font-medium '>Indulge in Flavorful Delights! Order Now for Fresh & Fast Food Delivery Straight to Your Doorstep.</p>
                              <Button className="bg-[#00afaa] text-white rounded-[5px] mt-2 z-50 ">Order now</Button>
                        </div>
                           <Image className='w-full h-full object-contain ' src={bannerGirl}  fluid />
                    </div>
               
               </>
            </Carousel.Item>
            <Carousel.Item>
               <Link to='/browse-products/Electroménager'>
                  <Image className='z-[-1] w-full md:h-[600px] h-[500px] !object-cover ' src={banner} fluid alt={"any"} />
               
               </Link>
            </Carousel.Item>
            <Carousel.Item>
               <Link to='/browse-products/Electroménager'>
                  <Image className='z-[-1] w-full h-[500px] !object-cover ' src={banner1} fluid alt={"any"} />
               
               </Link>
            </Carousel.Item>
            <Carousel.Item>
               <Link to='/browse-products/Electroménager'>
                  <Image className='z-[-1] w-full h-[500px] !object-cover ' src={banner2} fluid alt={"any"} />
               
               </Link>
            </Carousel.Item>
          
            {/* <Carousel.Item>
               <Link to='/browse-products/Maison%20-%20Cuisine%20-%20Deco'>
                  <Image className='z-[-1] ' src={isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/Mois-du-blanc/slider-mobile-linge-maison.webp' : "https://www.marjanemall.ma/media/wysiwyg/Mois-du-blanc/slider-linge-maison-desktop.webp" } fluid alt={"any"} />
               
               </Link>
            </Carousel.Item>
           
            <Carousel.Item>
               <Link to='/browse-boutique-brand/samsung'>
                  <Image className='z-[-1] '  src={ isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/Banner_subcateg_hp/Slider_Home_Page/Slider_SAMSUNG_mob_webp.webp' :  "https://www.marjanemall.ma/media/wysiwyg/Banner_subcateg_hp/Slider_Home_Page/Slider_SAMSUNG_desk.webp"} alt={"any"} fluid /> 
               </Link>
            </Carousel.Item>

            

            <Carousel.Item>
               <Link to='/browse-products/Beauté - Santé'>
                  <Image className='z-[-1] ' src={ isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/mobile_CA.jpg' :  "https://www.marjanemall.ma/media/wysiwyg/complement-alimentaire/Slider_compl_ment_alimentaire_desktop.webp"} alt={"any"} fluid /> 
               </Link>
            </Carousel.Item> */}
       
    </Carousel>
    </div>
  )
}

export default Hero