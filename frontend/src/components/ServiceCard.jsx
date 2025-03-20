
import img1 from './../images/card/slider-1.jpg'
import img2 from './../images/card/service1.jpg'
import img3 from './../images/card/service2.jpg'
import img4 from './../images/card/service4.jpg'

function ServiceCard() {
  return (
    <div className='flex justify-center item-center space-x-5'> 
      
<div className='max-w-60 shadow-lg  '>
     <img className='w-full' src={img1} alt="" />
     <h1 className=' p-2font-semibold text-xl flex justify-center mt-3'>Mental Health Support </h1>
     <ol className='mx-9 p-1 pb-3 list-disc text-slate-500'>
        <li>Depression</li>
        <li>Anxity</li>
        <li>Autism</li>
        <li>Obsessive–compulsive  disorder</li>
        <li>Post-Traumatic Stress Disorder</li>
        
        </ol>    
</div>




<div className='max-w-60 shadow-lg  '>
     <img className='w-full' src={img2} alt="" />
     <h1 className=' p-2font-semibold text-xl flex justify-center mt-3'>Physical Well-being</h1>
     <ol className='mx-9 p-1 pb-3 list-disc text-slate-500'>
        <li>Wound Care</li>
        <li>Rest and Recovery</li>
        <li>Emotional Recovery
</li>
        <li>Physical Activities</li>
        <li>PLifestyle Coaching</li>
        
        </ol>    
</div>
<div className='max-w-60 shadow-lg  '>
     <img className='w-full' src={img3} alt="" />
     <h1 className=' p-2font-semibold text-xl flex justify-center mt-3'>Health Management</h1>
     <ol className='mx-9 p-1 pb-3 list-disc text-slate-500'>
        <li>Home Safety</li>
        <li>Health Monitoring</li>
        <li>Medication Management</li>
        <li>Follow-up Appointments</li>
        
        </ol>    
</div>
<div className='max-w-60 shadow-lg  '>
     <img className='w-full' src={img4}alt="" />
     <h1 className=' p-2font-semibold text-xl flex justify-center mt-3'>Nutitional Guidance </h1>
     <ol className='mx-9 p-1 pb-3 list-disc text-slate-500'>
        <li>Personalized Meal Plans</li>
        <li>Expert Nutritional Counseling</li>
        <li>Dietary Education</li>
        <li>Ongoing Support</li>
        
        </ol>    
</div>


    </div>
  )
}

export default ServiceCard


