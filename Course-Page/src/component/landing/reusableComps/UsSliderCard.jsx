import React from 'react'

const UsSliderCard = ({UsSliderBg, title, Vector}) => {
  return (
    <div className='relative'>
        <img src={UsSliderBg} alt="" className="w-full h-full object-cover" />
        <p className='absolute top-78 right-13 text-xl text-white font-bold z-60'>{title}</p>
        <img src={Vector} alt="" className=' absolute top-80 right-5 z-30'/>
    </div>
  )
}

export default UsSliderCard