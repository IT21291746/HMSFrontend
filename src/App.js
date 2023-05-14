import './App.css';
import AddDoctor from './components/AddDoctor';
import AddPatient from './components/AddPatient';
import {BrowserRouter as Router, Route, Routes, redirect} from "react-router-dom"
import ViewDoctor from './components/viewDoctor';
import ViewPatient from './components/ViewPatient';
import UpdateDoctor from './components/UpdateDoctor';
import UpdatePatient from './components/UpdatePatient';
import AddMedicine from './components/AddMedicine';
import ViewMedicine from './components/ViewMedicine';
import UpdateMedicine from './components/UpdateMedicine';
import ViewEmployee from './components/ViewEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import AddEmployee from './components/AddEmployee';
import Home from './components/home';
import Report from './components/report';
import ViewOrder from './components/order';
import AddOrder from './components/AddOrder';
import UpdateOrder from './components/UpdateOrder';
import ViewResult from './components/ViewResult';
import UpdateResult from './components/UpdateResult';
import AddResult from './components/AddResults';
import MainHeader from './components/MainHeader';
import MainHome from './components/MainHome';
import MainHomeHeaderCom from './components/MainHomeHeaderCom';
import LabLogin from './components/LabLogin';
import PrivateRoute from "./components/PrivateRoute";
import { useState, useEffect } from 'react';
import LabUserProfile from './components/LabUserProfile';
import DoctorLogin from './components/DoctorLogin';
import DoctorHeaderComponent from './components/DoctorHeaderComponent';
import DoctorHome from './components/DoctorHome';
import DoctorProfile from './components/DoctorProfile';
import ResourceLogin from './components/ResourceLogin';
import ResourceHome from './components/ResourceHome';
import ResourceHeaderComponent from './components/ResourceHeaderComponent';
import AddCurrentResources from './components/AddCurrentResources';
import ViewCurrentResources from './components/ViewCurrentResources';
import UpdateCurrentResources from './components/UpdateCurrentResources';
import ViewSelectedPatient from './components/ViewSelectedPatient';
import AddMedicalRecords from './components/AddMedicalRecords';
import AddStaticResources from './components/AddStaticResources';
import ViewStaticResources from './components/ViewStaticResources';
import UpdateStaticResources from './components/UpdateStaticResources';
import ViewAllResources from './components/ViewAllResources';
import ViewSelectedStaticResources from './components/ViewSelectedStaticResources';
import LandingPage from './components/LandingPage';
import Doctor_LabManagement from './components/Doctor_LabManagement';
import Resource_Order from './components/Resource_Order';
import PharmacyLogin from './components/PharmacyLogin';
import PharmacyHome from './components/PharmacyHome';
import PharmacyHeaderComponent from './components/PharmacyHeaderComponents';
import Pharmacy_Medicine from './components/Pharmacy_Medicines';
import Pharmacy_Prescription from './components/Pharmacy_Prescription';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("loggedInUser") !== null);

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("loggedInUser");
    redirect("/");
  }


  //Automatically logout function
  useEffect(() => {
    let timeout;
    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsLoggedIn(false);
        localStorage.removeItem("loggedInUser")
        alert("Session Expired please login again")
        window.location.href='/';
      }, 10000000); // 5 minutes in milliseconds
    }
    resetTimeout();
    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keypress", resetTimeout);
    return () => {
      window.removeEventListener("mousemove", resetTimeout);
      window.removeEventListener("keypress", resetTimeout);
    }
  }, []);


  if (!isLoggedIn) {
    redirect("/");
  }



  return (
    <Router>
      <div className="App">
        <MainHeader handleSignOut={handleSignOut}/>
        <MainHomeHeaderCom handleSignOut={handleSignOut}/>
        <DoctorHeaderComponent handleSignOut={handleSignOut}/>
        <ResourceHeaderComponent handleSignOut={handleSignOut}/>
        <PharmacyHeaderComponent handleSignOut={handleSignOut}/>
        

        <PrivateRoute path="/labhome" element={<Home />}/>
        <PrivateRoute path="/doctorHome" element={<DoctorHome />}/>
        <PrivateRoute path="/resourceHome" element={<ResourceHome />}/>
        <PrivateRoute path="/pharmacyHome" element={<PharmacyHome />}/>
        
          <Routes>
            <Route path="/addPatient" element={<AddPatient/>}/>
            <Route path="/addDoctor" element={<AddDoctor/>} />
            <Route path="/viewDoctor" element={<ViewDoctor/>} />
            <Route path="/viewPatient" element={<ViewPatient/>} />
            <Route path="/updateDoctor/:id" element={<UpdateDoctor/>} />
            <Route path="/updatePatient/:id" element={<UpdatePatient/>} />
            <Route path="/addMedicine" element={<AddMedicine/>} />
            <Route path="/viewMedicine" element={<ViewMedicine/>} />
            <Route path="/updateMedicine/:id" element={<UpdateMedicine/>} />
            <Route path="/viewEmployee" element={<ViewEmployee/>} />
            <Route path="/updateEmployee/:id" element={<UpdateEmployee/>} />
            <Route path="/addEmployee" element={<AddEmployee/>} />
            
            <Route path="/report" element={<Report/>} />
            <Route path="/order" element={<ViewOrder/>} />
            <Route path="/addOrder" element={<AddOrder/>} />
            <Route path="/updateOrder/:id" element={<UpdateOrder/>} />
            <Route path="/viewResult" element={<ViewResult/>} />
            <Route path="/updateResult/:id" element={<UpdateResult/>} />
            <Route path="/addResult/:id" element={<AddResult/>} />
            <Route path="/" element={<MainHome/>} />
            <Route path="/labLogin" element={<LabLogin/>} />
            <Route path="/profile" element={<LabUserProfile/>} />
            <Route path="/doctorLogin" element={<DoctorLogin/>} />
            <Route path="/doctorProfile" element={<DoctorProfile/>} />
            <Route path="/resourceLogin" element={<ResourceLogin/>} />
            <Route path="/addCurrentResources" element={<AddCurrentResources/>} />
            <Route path="/viewCurrentResources" element={<ViewCurrentResources/>} />
            <Route path="/updateCurrentResources/:id" element={<UpdateCurrentResources/>} />
            <Route path="/viewSelectedPatient/:id" element={<ViewSelectedPatient/>} />
            <Route path="/addMedicalRecords" element={<AddMedicalRecords/>} />
            <Route path="/addStaticResources" element={<AddStaticResources/>} />
            <Route path="/viewStaticResources" element={<ViewStaticResources/>} />
            <Route path="/updateStaticResources/:id" element={<UpdateStaticResources/>} />
            <Route path="/viewAllResources" element={<ViewAllResources/>} />
            <Route path="/viewSelectedStaticResources/:id" element={<ViewSelectedStaticResources/>} />
            <Route path="/doctor_labmanagement" element={<Doctor_LabManagement/>} />
            <Route path="/resource_order" element={<Resource_Order/>} />
            <Route path="/pharmacylogin" element={<PharmacyLogin/>} />
            <Route path="/pharmacy_medicine" element={<Pharmacy_Medicine/>} />
            <Route path="/pharmacy_prescription" element={<Pharmacy_Prescription/>} />

          </Routes>
          
      </div>
    </Router>
  );
}

export default App;