import { Image } from "react-bootstrap"
import { Button } from "../ui/button"

import aboutImage from '@/assets/about-banner.jpg'
import aboutImage2 from '@/assets/shape-3.png'
const About = () => {
  return (
    <div className="w-full about my-10">
    <div className="max-w-[1400px] mx-auto ">
          <div className="flex  lg:flex-row flex-col lg:items-start items-center  lg:justify-between justify-center w-full">
               <div className="flex  py-20 flex-1 flex-col items-center justify-center text-center relative">
                  <h2 className="text-[#DCCA87] text-3xl font-medium capitalize ">our story</h2>
                  <h3 className="font-bold text-[24px] leading-[1.7] text-white  capitalize mt-2 ">every flavor tells a story</h3>
                  <p className="max-w-[500px] text-gray-300 font-medium text-base  ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
                     quidem deleniti eum nesciunt temporibus ea eligendi aspernatur
                      mollitia natus vitae, fuga possimus repellendus 
                      quod et magnam tenetur nemo totam asperiores.</p>
                      <div className="flex flex-col mt-5">
                      <p className="text-white font-bold text-base ">Book throught call</p>
                <a className="text-gray-500 underline font-semibold" href="tel:+212 (609547692)">+212 609547692</a>
                <Button className='w-fit mt-3 rounded-[5px] text-white bg-[#0aafaa] hover:bg-[#0aafaa] ' type='button'>
                      Read more
                </Button>
                      </div>
                
                <Image  className="w-[120px] absolute left-10 pt-20 object-contain " src={aboutImage2} alt="" />
               </div>
               <div className="relative flex-1 w-full">
                    <Image  fluid className="w-full h-full object-cover" alt='about' src={aboutImage} />
               </div>
          </div>
    </div>
    </div>
  )
}

export default About