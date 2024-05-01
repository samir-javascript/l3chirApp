import badge1 from '@/assets/badge1.png'
import badge2 from '@/assets/badge2.png'
import badge3 from '@/assets/badge3.png'
import badge4 from '@/assets/badge4.png'
import payment from '@/assets/paiement_x2_1.webp'

const AccordionPart = () => {
  return (
    <ul className='flex-1 lg:mt-0 mt-8'>
                 
                  <div className='flex lg:flex-col space-y-8 flex-wrap lg:gap-x-0 gap-x-4'>
                  <h2 className='font-semibold text-[16px] mb-3 capitalize lg:block hidden '>Nos engagements</h2>
                  <li className='flex items-center gap-x-[40px] '>
                      <div className='flex items-center space-x-2'>
                           <img  className='w-[45px] h-auto object-contain ' src={badge1} alt="" />
                           <div className='flex flex-col gap-1'>
                              <p className='font-semibold text-slate-50 text-sm '>Produits 100%</p>
                              <p className='font-semibold text-slate-50 text-sm ' >authentiques</p>
                            </div>
                      </div>
                      <div className='flex items-center  space-x-2'>
                           <img className='w-[45px] h-auto object-contain ' src={badge3} alt="" />
                           <div className='flex flex-col gap-1'>
                              <p className='font-semibold text-slate-50 text-sm '>Livraison partout</p>
                              <p className='font-semibold text-slate-50 text-sm '>au Maroc</p>
                            </div>
                      </div>
                  </li>
                  <li className='flex items-center gap-x-[40px]  '>
                      <div className='flex items-center space-x-2'>
                           <img  className='w-[45px] h-auto object-contain ' src={badge2} alt="" />
                           <div className='flex flex-col gap-1'>
                              <p className='font-semibold text-slate-50 text-sm '>Satisfait ou</p>
                              <p className='font-semibold text-slate-50 text-sm ' >emboursé</p>
                            </div>
                      </div>
                      <div className='flex items-center  space-x-2'>
                           <img className='w-[45px] h-auto object-contain ' src={badge4} alt="" />
                           <div className='flex flex-col gap-1'>
                              <p className='font-semibold text-slate-50 text-sm '>Offre nationale et</p>
                              <p className='font-semibold text-slate-50 text-sm '>internationale</p>
                            </div>
                      </div>
                  </li>
                  <li className='flex lg:flex-col flex-wrap lg:items-start items-center lg:space-x-0 space-x-12 '>
                  <h2 className='font-semibold text-[16px] text-slate-50 mb-3 capitalize '>Modes de paiement</h2>
                  <img className='w-[320px] object-contain ' src={payment} alt="" />
                  </li>
                  </div>
                  
             </ul>
  )
}

export default AccordionPart