
import img1 from './../../images/staff/staff_1.jpg'
import img2 from './../../images/staff/staff_2.jpg'
import img3 from './../../images/staff/staff_3.jpg'
import img4 from './../../images/staff/staff_4.jpg'

function Team() {
  return (
    <div className=' bg-slate-200'>
      <div  className='flex justify-center'><h1 className='mt-6 text-5xl font-bold '>Our Team</h1></div>

  <div className='flex p-20 justify-around'>
    <div className='w-[170px] '>
        <div className='flex justify-center mb-3'><img className='h-30 w-30 rounded-full' src={img1}alt="" /></div>
        <div className='flex justify-center'><h1 className='font-bold text-xl'>Jean Smith</h1></div>
    </div>
   


    <div className='w-[170px]'>
        <div className='flex justify-center mb-3'><img className='h-30 w-30 rounded-full' src={img2}alt="" /></div>
        <div className='flex justify-center'><h1 className='font-bold text-xl'>Myla Anderson</h1></div>
    </div>


    <div className='w-[170px]'>
        <div className='flex justify-center mb-3'><img className='h-30 w-30 rounded-full' src={img3}alt="" /></div>
        <div className='flex justify-center'><h1 className='font-bold text-xl'>Cathy Jackson</h1></div>
    </div>


    <div className='w-[170px]'>
        <div className='flex justify-center mb-3 '><img className='h-30 w-30 rounded-full' src={img4}alt="" /></div>
        <div className='flex justify-center'><h1 className='font-bold text-xl'>Mellissa Gold</h1></div>
    </div>

    
  </div>

    </div>
  )
}

export default Team
