import { useEffect, useState } from 'react';
import axios from 'axios';

const ResisdentDetail = () => {
  const [resident, setResident] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResidentDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token)
        const response = await axios.get('http://localhost:3000/api/v1/added-resisdents/added-resident-details', {
          headers: {
           Authorization: `bearer ${token}`
          }
        });

        setResident(response.data);
      } catch (error) {
        setError('Failed to fetch resident details.'  + error);
      }
    };

    fetchResidentDetails();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!resident) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <div className='flex h-[550px]  justify-center items-center '>
        <div className='p-[40px] h-[500px]  border-solid border-[10px] rounded-lg border-sky-800 w-[750px]  mx-auto  shadow-slate-900'>
      <div className='flex justify-center'><h1 className='font-bold text-3xl'>Resident Details</h1></div>
  <div className='w-full mt-4 border-slate-400 border-solid border-2'></div>      
<div className='ml-[100px] mt-6'>

      
<p className='text-xl h-[60px] w-full'><span className='font-bold m-6 w-[30px] h-[50px]  p-2'>First Name:</span> <span className=' p-4 m-6'>{resident.first_name}</span></p>
<p className='text-xl h-[60px] w-full'><span className='font-bold m-6  p-2'>Last Name: </span> <span className=' p-4 m-6'>{resident.last_name}</span></p>
<p className='text-xl h-[60px] w-full'><span className='font-bold m-6  p-2'>Email:      </span> <span className=' p-4 ml-[70px] m-6'>{resident.email}</span></p>
<p className='text-xl h-[60px] w-full'><span className='font-bold m-6  p-2'>Phone:</span> <span className=' p-4 ml-[60px] m-6'>{resident.phone}</span></p>
<p className='text-xl h-[60px] w-full'><span className='font-bold m-6  p-2'>Gender:</span> <span className=' p-4 ml-[55px] m-6'>{resident.gender}</span></p>
     
      </div>
      </div>
    </div>


    <div className='flex h-[350px] mt-[100px] justify-center items-center '>
        <div className='p-[40px] h-[500px] border-solid border-[10px] rounded-lg border-sky-800 w-[750px] shadow-3xl shadow-slate-900'>
      <div className='flex justify-center'><h1 className='font-bold text-3xl'>Activities</h1></div>
  <div className='w-full mt-4 border-slate-400 border-solid border-2'></div>      

    <div className='flex justify-center'>
<div className=' w-[200px] h-[]200px m-3 border-2 p-2 border-sky-600 rounded-2xl shadow-xl'>
    <h1 className='flex justify-center font-semibold text-xl'>Activity 2</h1>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe totam veritatis repudiandae eveniet necessitatibus nobis suscipit quia debitis voluptatibus consectetur.</p>
</div>

<div className=' w-[200px] h-[]200px m-3 border-2 p-2 border-sky-600 rounded-2xl shadow-xl'>
    <h1 className='flex justify-center font-semibold text-xl'>Activity 2</h1>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe totam veritatis repudiandae eveniet necessitatibus nobis suscipit quia debitis voluptatibus consectetur.</p>
</div>
</div>

      </div>
    </div>
    </>
  );
};


export default ResisdentDetail
