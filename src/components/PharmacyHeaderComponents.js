import React from "react";
import Header from "./header";
import { Route ,Routes} from "react-router-dom";
import PharmacyHeader from "./PharmacyHeader";

function PharmacyHeaderComponent() {
  return (
    
    <Routes>
       <Route exact path="/pharmacyHome" element={<PharmacyHeader />}/>
       <Route exact path="/pharmacy_medicine" element={<PharmacyHeader />}/>
       <Route exact path="/addMedicine" element={<PharmacyHeader />}/>
       <Route exact path="/viewMedicine" element={<PharmacyHeader />}/>
       <Route exact path="/updateMedicine/:id" element={<PharmacyHeader />}/>
       <Route exact path="/pharmacy_prescription" element={<PharmacyHeader />}/>
    </Routes>
  );
}

export default PharmacyHeaderComponent;
