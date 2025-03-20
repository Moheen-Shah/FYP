
import slider from './../../images/slider-2.jpg'
function ServiceHero() {
  return (
    <>
   {/* <img src={slider} alt="" /> */}

   <div style={{backgroundImage:`url(${slider})`}} className=' flex items-center justify-center bg-cover bg-center  w-full h-[500px]  '>
    <div className=' w-full max-w-[440px] mx-[150px]'>
   <h1  className='text-white mb-5 flex justify-center font-bold text-5xl'> Our Services</h1>
   <p className='text-xl mt-2 text-white'>At Keystone Care Ltd, we provide tailored and compassionate services for pre and post-operated patients, as well as dedicated support for individuals facing challenges related to old age and mental health disorders. Our goal is to enhance well-being and quality of life through personalized care.</p>
   <div className='flex justify-center'>
   <button className=' mt-10  text-white  bg-blue-500 py-3 px-5 rounded-[25px]'>Get in touch</button>
   </div></div>
   </div>
  
   </>
  )
}

export default ServiceHero
