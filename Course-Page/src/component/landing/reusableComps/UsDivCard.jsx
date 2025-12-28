import React from 'react'

const UsDivCard = ({title, text}) => {
  return (
    <div className='bg-teal-600 p-6 text-white flex flex-col justify-center items-center rounded-2xl opacity-95 gap-2'>
        <h3 className=' font-bold text-xl text-center'>{title}</h3>
        <p>{text}</p>
    </div>
  )
}

export default UsDivCard