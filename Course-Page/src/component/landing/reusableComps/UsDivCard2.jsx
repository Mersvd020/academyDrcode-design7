import React from 'react'

const UsDivCard2 = ({title, text}) => {
  return (
    <div className=' bg-purple-500 border p-5 px-20 text-white flex flex-col justify-center items-center rounded-2xl opacity-95 gap-2'>
        <h3 className=' font-bold text-xl text-center'>{title}</h3>
        <p>{text}</p>
    </div>
  )
}

export default UsDivCard2