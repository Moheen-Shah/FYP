
import image from './../images/about.png'
function InfoSection() {
  return (
    <div className='flex bg-blue-500 p-10 ' >
      

<img className='w-full max-w-[700px]' src={image} alt="" />
      <div className='p-20 text-white'>
<h1 className='text-3xl font-bold'>KeyStone for Senior & Elder Home Care Center</h1>

<p className='text-ls text-justify mt-4 leading-6'>Keystone Care Center is dedicated to providing unwavering support and exceptional care for elderly individuals. Preserving dignity, promoting independence, and enhancing overall well-being, we create a nurturing environment that feels like home. Through expert nursing care, personalized attention, and engaging activities
<br />
We aim to make a positive impact on the lives of our residents, ensuring they receive the respect, compassion, and quality care they deserve during their golden years.</p>


<h1 className='text-3xl mt-5 font-semibold'>“We care for elderly people”</h1>
      </div>
    </div>
  )
}

export default InfoSection
