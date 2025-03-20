
import svg1 from './../../images/svg/001-elderly.svg'
import svg2 from './../../images/svg/002-elderly-1.svg'
import svg3 from './../../images/svg/003-rocking-chair.svg'



function ServicesContact() {
    return (
        <div className='mt-20 flex justify-around items-center bg-slate-300 p-10'>
           
           <div className='flex space-x-5 '>
                <div className='h-20 w-20 items-center justify-center'>
                    <img className='' src={svg1} alt="logo" />
                </div>
                <div className='flex-col item-center justify-center'>
                    <p className='text-sm '>  Try Our Services</p>
                    <h1 className='font-bold text-slate-700'>Phone Number: 0044 (0)</h1>
                    <h1 className='font-bold text-slate-700'>7477881189</h1>
    
                </div>
    
    
                
            </div>
    
    
    
    
            <div className='flex space-x-5 '>
                <div className='h-20 w-20 items-center justify-center'>
                    <img src={svg2} alt="logo" />
                </div>
                <div className='flex-col item-center justify-center'>
                    <p className='text-sm '>  Try Our Services</p>
                    <h1 className='font-bold text-slate-700'>Phone Number: 0044 (0)</h1>
                    <h1 className='font-bold text-slate-700'>7477881189</h1>
    
                </div>
    
    
                
            </div>
    
    
    
    
            <div className='flex space-x-5 '>
                <div className='h-20 w-20 items-center justify-center'>
                    <img src={svg3} alt="logo" />
                </div>
                <div className='flex-col item-center justify-center'>
                    <p className='text-sm '>  Try Our Services</p>
                    <h1 className='font-bold text-slate-700'>Phone Number: 0044 (0)</h1>
                    <h1 className='font-bold text-slate-700'>7477881189</h1>
    
                </div>
    
    
                
            </div>
        </div>
      )
}

export default ServicesContact
