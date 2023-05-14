import React from "react";
import { Link } from "react-router-dom";

function MainHome(){


    const handleLabLoginClick = () => {
        window.location.href="/labLogin";
      };

      const handleDoctorLoginClick = () => {
        window.location.href="/doctorLogin";
      };

      const handleResourceLoginClick = () => {
        window.location.href="/resourceLogin";
      };
      const handlePharmacyLoginClick = () => {
        window.location.href="/pharmacyLogin";
      };

    return( 
        <center>
            <div>
                <div className="container px-4 text-center">
                    <div className="row gx-5">
                        <h1>WELCOME</h1>
                        
                        <div className="col">    
                        <div className="btn-div p-3"> 
                            <button className="btn-left" onClick={handleLabLoginClick}>Laboratory Management System</button>
                        </div>
                        </div>
                        
                        <div className="col">    
                        <div className="btn-div p-3"> 
                            <button className="btn-left" onClick={handleDoctorLoginClick}>Doctor Management System</button>
                        </div>
                        </div>
                        
                    </div>    

                    <div className="row gx-5">
                        
                        <div className="col">    
                        <div className="btn-div p-3"> 
                            <button className="btn-left" onClick={handlePharmacyLoginClick}>Pharmacy Management System</button>
                        </div>
                        </div>
                        
                        <div className="col">    
                        <div className="btn-div p-3"> 
                            <button className="btn-left" onClick={handleResourceLoginClick}>Resource Management System</button>
                        </div>
                        </div>
                        
                    </div>    

                </div>
            </div>
        </center>
    )
}


export default MainHome;