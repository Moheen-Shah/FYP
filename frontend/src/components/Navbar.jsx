

import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <div className='bg-white flex justify-between items-center p-5 shadow-xl sticky'>
      
<div className='text-blue-500 font-bold text-2xl'>
    KeyStone
</div>

<div className='ml-4 '>
    <ul className='flex justify-center items-center font-semibold text-base '>
  <Link to='/'>  <li className='mx-2 hover:text-blue-500 hover:underline'>Home</li></Link>
  <Link to='/services'>  <li className='mx-2 hover:text-blue-500 hover:underline'>Services</li></Link>

  <Link to='/about'>  <li className='mx-2 hover:text-blue-500 hover:underline'>About</li></Link>

  <Link to='/contact'>  <li className='mx-2 hover:text-blue-500 hover:underline'>Contact</li></Link>

     

    </ul>
</div>

<div className=''>
 <Link to ='/AlllLogin'><button className='mx-2 border-white border-2 bg-blue-600 text-white rounded-[7px] px-[11px] py-1'>Login</button></Link>   
 <Link to ='/signup'>  <button className='mx-2 bg-blue-600 text-white rounded-[5px] px-2 py-1'>SignUp</button></Link>  

    </div>


    </div>
  )
}

export default Navbar
