
import slider from './../../images/slider2-2.jpg'
function ContactHero() {
  return (
    <>
    {/* <img src={slider} alt="" /> */}
 
    <div style={{backgroundImage:`url(${slider})`}} className=' flex items-center justify-center bg-cover bg-center  w-full h-[500px]  '>
     <div className=' w-full max-w-[440px] mx-[150px]'>
    <h1  className='text-white mb-5 flex justify-center font-bold text-5xl'>Contact us</h1>
    <p className='text-xl mt-2 text-white'>Reach out to us at Keyston care to discover how our dedicated team at Keyston can provide personalized and expert care for your loved ones. Your journey towards quality elderly health begins here.</p>
    <div className='flex justify-center'>
    <button className=' mt-10  text-white  bg-blue-500 py-3 px-5 rounded-[25px]'>Get in touch</button>
    </div></div>
    </div>
   
    </>
  )
}

export default ContactHero
