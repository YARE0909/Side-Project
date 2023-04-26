import React from 'react'

const Hero = ({message}: any) => {
  return (
    <div className='w-full min-h-screen h-full bg-transparent flex justify-center items-center'>
        <h1 className='text-[#f0efef] font-extrabold text-4xl p-4'>{message}</h1>
    </div>
  )
}

export default Hero