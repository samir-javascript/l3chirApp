/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const SpecialMenuItem = ({title,tags,price}) => {
  return (
    <div className='w-full flex-col flex my-[1rem] '>
        <div className="flex items-center justify-between">
              <div className='flex-1'>
                 <p className='text-[#DCCA87] font-medium text-[16px] leading-[1.7] font-serif '>{title}</p>
              </div>
              <div className='w-[90px] h-[1px] mx-[1rem] bg-[#dcca87] ' />
              <div className='flex justify-end items-end'>
                    <p className='text-white font-semibold text-[20px] leading-[1.7] font-serif '> {price} </p>
              </div>
        </div>
        <div className="w-full mt-[0.2rem] ">
             <p className='text-[#aaa] text-base font-medium '>{tags} </p>
        </div>
    </div>
  )
}

export default SpecialMenuItem