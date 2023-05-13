import React from "react";
import { Route ,Routes} from "react-router-dom";
import ResourceHeader from "./ResourceHeader";

function ResourceHeaderComponent() {
  return (
    
    <Routes>
    <Route exact path="/resourceHome" element={<ResourceHeader />}/>
    <Route exact path="/addCurrentResources" element={<ResourceHeader />}/>   
    <Route exact path="/viewCurrentResources" element={<ResourceHeader />}/> 
    <Route exact path="/updateCurrentResources/:id" element={<ResourceHeader />}/>
    <Route exact path="/addStaticResources" element={<ResourceHeader />}/>
    <Route exact path="/viewStaticResources" element={<ResourceHeader />}/>    
    <Route exact path="/updateStaticResources/:id" element={<ResourceHeader />}/>
    <Route exact path="/viewAllResources" element={<ResourceHeader />}/>
    <Route exact path="/viewSelectedStaticResources/:id" element={<ResourceHeader />}/>
    
    </Routes>
  );
}

export default ResourceHeaderComponent;
