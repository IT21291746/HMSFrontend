import React from "react";
import Header from "./header";
import { Route ,Routes} from "react-router-dom";

function MainHeader() {
  return (
    
    <Routes>
    <Route exact path="/labhome" element={<Header />}/>
    <Route exact path="/report" element={<Header />}/>
    <Route exact path="/viewEmployee" element={<Header />}/>
    <Route exact path="/updateEmployee/:id" element={<Header />}/>
    <Route exact path="/addEmployee" element={<Header />}/>
    <Route exact path="/order" element={<Header />}/>
    <Route exact path="/addOrder" element={<Header />}/>
    <Route exact path="/updateOrder/:id" element={<Header />}/>
    <Route exact path="/viewResult" element={<Header />}/>
    <Route exact path="/updateResult/:id" element={<Header />}/>
    <Route exact path="/addResult/:id" element={<Header />}/>
    <Route exact path="/profile" element={<Header />}/>

    </Routes>
  );
}

export default MainHeader;
