import Navbar from './components/Navbar';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Hero from './components/Hero';
import Services from './components/Services';
import ContactSection from './components/ContactSection';
import Family from './components/Family';
import GoalCrads from './components/GoalCrads';
import InfoSection from './components/InfoSection';
import Footer from './components/Footer';
import GoalSection from './components/GoalSection';
import Signup from './components/signup/Signup';
// import Login from './components/login/Login';
// import ResisdentDetail from './components/ResisdentDetail';
import Services1 from './components/services/Services1';
import AboutUs from './components/aboutus/AboutUs';
import Contact from './components/contact/Contact';
import AlllLogin from './components/allLogins/AlllLogin';
// import AdminLogin from './components/login/AdminLogin';
import Admin from './components/admin/Admin';
// import StaffLogin from './components/login/StaffLogin';
import StaffDashboard from './components/staff/StaffDashboard';
import ResidentDashboard from './components/reisdentDashboard/ResidentDashboard';
import Dashboard from './components/doctorDashboard/Dashboard';

function App() {
  return (

    <div>
      
 <Router>

 <Navbar />
      <Routes>
        <Route path='/' exact element={<Home/>}></Route>
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/AlllLogin"  element={<AlllLogin/>}/>
        <Route path="/doctor-dashboard/*"  element={<Dashboard/>}/>

        
        <Route path='/staffpage/*' element={<StaffDashboard/>}/>
        <Route path='/adminPage/*' element={<Admin/>}/>
        <Route path="/resident-dashboard/*" element={<ResidentDashboard/>} />
        <Route path="/services" exact element={<Services1/>}/>
        <Route path="/about" exact element={<AboutUs/>}/>
        <Route path="/contact" exact element={<Contact/>}/>
      </Routes>
    </Router>
      </div>
    
  );
}

export default App;


function Home(){

return (<>

<Hero/>

<Services/>

<ContactSection/>
<Family/>
<GoalSection/>
<GoalCrads/>
<InfoSection/>

<Footer></Footer>

</>)
}