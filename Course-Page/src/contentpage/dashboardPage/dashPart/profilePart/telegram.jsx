import React from 'react'

const Telegram = () => {
  return (
    <div  className='lg:h-full h-screen lg:w-full w-[320px] flex text-[12px] pt-2 flex-col gap-5 '>
        <input placeholder='ایمیل' className=' outline-0  bg-[#F5F5F5]  indent-3 rounded-[8px] w-full h-[50px]'/>
      <input placeholder='آدرس سکونت' className=' outline-0 bg-[#F5F5F5] indent-3 rounded-[8px] w-full h-[50px]'/>
      <button className='w-[150px] bg-[#9B0EE1] rounded-[8px] text-white font-medium text-[13px] indent-[-5px] outline-0 h-[45px] indent-3  mb-2 w'>اعمال تغییرات</button>
      </div>
  )
}

export default Telegram