
import slider from './../../images/slider2-2.jpg'


function AboutHero() {
  return (
    <>
   {/* <img src={slider} alt="" /> */}

   <div style={{backgroundImage:`url(${slider})`}} className=' flex items-center justify-center bg-cover bg-center  w-full h-[500px]  '>
    <div className=' w-full max-w-[440px] mx-[150px]'>
   <h1  className='text-white mb-5 flex justify-center font-bold text-5xl'>About Us</h1>
   <p className='text-xl mt-2 text-white'>Welcome to Keystone Care Ltd, your compassionate partner in health. We provide professional care for pre and post-operated patients, as well as support for individuals facing challenges related to old age and mental health disorders.</p>
   <div className='flex justify-center'>
   <button className=' mt-10  text-white  bg-blue-500 py-3 px-5 rounded-[25px]'>Get in touch</button>
   </div></div>
   </div>
  
   </>
  )
}

export default AboutHero
