
import phone from './../images/svg/Phone2.svg'
import email from './../images/svg/email-svgrepo-com.svg'
function ContactSection() {
  return (
    <div className='mt-20 flex justify-around items-center bg-slate-300 p-10'>
       
       <div className='flex space-x-5 '>
            <div className='h-20 w-20 items-center justify-center'>
                <img className='' src={phone} alt="logo" />
            </div>
            <div className='flex-col item-center justify-center'>
                <p className='text-sm '>  Try Our Services</p>
                <h1 className='font-bold text-slate-700'>Phone Number: 0044 (0)</h1>
                <h1 className='font-bold text-slate-700'>7477881189</h1>

            </div>


            
        </div>




        <div className='flex space-x-5 '>
            <div className='h-20 w-20 items-center justify-center'>
                <img src={email} alt="logo" />
            </div>
            <div className='flex-col item-center justify-center'>
                <p className='text-sm '>  Try Our Services</p>
                <h1 className='font-bold text-slate-700'>Email : sadiaali83@hotmail.com</h1>
                

            </div>


            
        </div>




        <div className='flex space-x-5 '>
            <div className='h-20 w-20 items-center justify-center'>
                <img src={phone} alt="logo" />
            </div>
            <div className='flex-col item-center justify-center'>
                <p className='text-sm '>  Try Our Services</p>
                <h1 className='font-bold text-slate-700'>Adress: 68 Thomhill Road E10  <br /> 5LL London</h1>
                

            </div>


            
        </div>
    </div>
  )
}

export default ContactSection
