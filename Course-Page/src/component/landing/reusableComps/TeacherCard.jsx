import React from 'react'
import Teacher3 from "../../../assets/landPagePic/teacher3.png"


const TeacherCard = ({image , teacherName , title , nightMode,polygon}) => {
  return (
    <div className='relative rounded-[10px]'>
        <img src={image || Teacher3} className=" w-[500px] rounded-[10px] h-[300px] object-cover" alt="" />
        <div className='absolute bottom-6 left-0 right-0 to-transparent p-6 text-center text-white flex gap-1 flex-col'>
          <img src={polygon} alt="yo" className=' absolute lg:block hidden z-10 right-23 bottom-13 scale-105' />
          <p className={`${nightMode ? "text-[black]" : "text-[white]"} text-xl font-semibold mb-1 z-20`}>{teacherName}</p>
          <h3 className={`${nightMode ? "text-[black]" : "text-[white]"} text-[12px] font-bold opacity-90 z-20'`}>{title}</h3>
        </div>
        
        
    </div>
  )
}

export default TeacherCard