
import person1 from './../images/person1.jpg'
import person2 from './../images/person_1.jpg'
import person3 from './../images/person_3.jpg'

function GoalCrads() {
  return (
    <div className='p-20 mt-20 flex justify-around  bg-slate-100'> 
      <div className='w-full max-w-[300px] p-10 bg-white rounded-lg shadow-lg'>
        <img className='h-20 w-20 rounded-full mx-auto -mt-20' src={person1} alt="" />
        <p className='text-justify italic mt-10'>Keystone Care Center has exceeded my expectations. The expert care, friendly staff, and vibrant atmosphere make every moment here enjoyable. Grateful for the sense of community and genuine concern for our well-being !</p>
        <h1 className='text-center mt-5 text-sm italic text-slate-400'>Elica Anderson, Senior</h1>
      </div>

      <div className='w-full max-w-[300px] p-10 bg-white rounded-lg shadow-lg'>
        <img className='h-20 w-20 rounded-full mx-auto -mt-20' src={person2} alt="" />
        <p className='text-justify italic mt-10'>Keystone Care Center has truly become my sanctuary. The staffs warmth and expertise make every day here special. Grateful for the caring environment and thoughtful attention to my needs !</p>
        <h1 className='text-center mt-5 text-sm italic text-slate-400'>Maria Cumming, Senior</h1>
      </div>

      <div className='w-full max-w-[300px] p-10 bg-white rounded-lg shadow-lg'>
        <img className='h-20 w-20 rounded-full mx-auto -mt-20' src={person3} alt="" />
        <p className='text-justify italic mt-10'>My time at Keystone Care Center has been wonderful. The personalized care and engaging activities have made my stay truly enjoyable. It feels like a home filled with kindness and compassion !</p>
        <h1 className='text-center mt-5 text-sm italic text-slate-400'>Albert Stefin, Senior</h1>
      </div>
    </div>
  )
}

export default GoalCrads
