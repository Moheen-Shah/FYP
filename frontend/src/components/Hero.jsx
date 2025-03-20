
import slider from './../images/slider1-1.jpg'
function Hero() {
  return (
   <>
   {/* <img src={slider} alt="" /> */}

   <div style={{backgroundImage:`url(${slider})`}} className=' flex items-center bg-cover bg-center  w-full h-[500px]  '>
    <div className=' w-full max-w-[440px] mx-[150px]'>
   <h1 className='text-white font-bold text-4xl'> Expert Care for the Elderly</h1>
   <p className='text-xl mt-2 text-white'>Welcome to Keystone Care Ltd, where we extend compassionate support and professional care to pre post operated patients and individuals navigating the challenges of old age and mental health discorders.</p>
   <button className=' mt-10  text-white bg-blue-500 py-3 px-5 rounded-[25px]'>Get in touch</button>
   </div>
   </div>
  
   </>
  )

}

export default Hero
