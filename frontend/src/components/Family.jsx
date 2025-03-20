
import image1 from './../images/img_3.jpg'
import image2 from './../images/img_2.jpg'


function Family() {
  return (
    <div className='mt-20'>
     

<div className='flex jystify-around'>
    <div className=' w-full max-w-[700px] p-10'>
  <h1 className='text-3xl font-bold text-slate-700'>Keystone Care Center is for Your Family</h1>
  <p className='text-lg mt-5 text-slate-600'>Our mission is to be more than just a care center; we strive to be an extended family, Nurturing Independence, Fostering Well-being. At Keystone Care, our mission is to provide unparalleled care for seniors and elders, cultivating an environment that prioritizes physical health, emotional fulfillment, and meaningful social connections. We are dedicated to enhancing the quality of life for each resident through personalized attention, unwavering respect, and a steadfast commitment to preserving individual dignity. Our goal is to be a trusted partner in the aging journey, promoting independence, joy, and purpose for every member of the Keystone Care community</p>
    </div>


    <div className='p-10 w-full max-w-[480px]'>
<h1 className='bg-blue-500 text-white text-center p-5 text-lg'>You can live here with love</h1>
<img className='w-full max-w-[480px]  ' src={image2} alt="" />
    </div>
</div>


<div className='flex px-10'> 
    <div className='w-full max-w-[300px]'>
        <img src={image1} alt="" />
    </div>
    <div className='mx-10'>
        <ol className='list-disc '>
                  <li className='mt-2'>Compassionate Support</li>
                  <li className='mt-2'>Personalized Attention</li>
                  <li className='mt-2'>Nurturing Atmosphere</li>
        </ol>
    </div>
</div>

    </div>
  )
}

export default Family
