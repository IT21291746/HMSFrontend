import React from "react";
import { Route ,Routes} from "react-router-dom";
import DoctorHeader from "./DoctorHeader";

function DoctorHeaderComponent() {
  return (
    
    <Routes>
    <Route exact path="/doctorHome" element={<DoctorHeader />}/>
    <Route exact path="/doctorProfile" element={<DoctorHeader />}/>
    <Route exact path="/viewDoctor" element={<DoctorHeader />}/>
    <Route exact path="/addDoctor" element={<DoctorHeader />}/>
    <Route exact path="/updateDoctor/:id" element={<DoctorHeader />}/>
    <Route exact path="/viewPatient" element={<DoctorHeader />}/>
    <Route exact path="/viewSelectedPatient/:id" element={<DoctorHeader />}/>
    <Route exact path="/addMedicalRecords" element={<DoctorHeader />}/>
    <Route exact path="/doctor_labmanagement" element={<DoctorHeader />}/>
    
    
    </Routes>
  );
}

export default DoctorHeaderComponent;
