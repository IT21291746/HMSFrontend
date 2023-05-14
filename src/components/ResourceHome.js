import React, { useState, useEffect } from "react";
import axios from "axios";
function ResourceHome(){

  const [currentresources, setCurrentResources] = useState([]);
  const [staticresources, setStaticResources] = useState([]);
  const [substaticresources, setSubStaticResources] = useState([]);
  const [filteredcurrentresources, setFilteredCurrentResources] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {

    const loggedInUsers = JSON.parse(localStorage.getItem("loggedInUser"));
  
    if (loggedInUsers) {
      axios
        .post(`http://localhost:8070/doctor/findOne/${loggedInUsers.loggedInUser._id}`)
        .then((response) => {
          console.log(response)
          setUser(response.data);
        }) 
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

    useEffect(() => {
        axios
          .get("http://localhost:8070/currentresources/")
          .then((response) => {
            setCurrentResources(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

      useEffect(() => {
        axios
          .get("http://localhost:8070/currentresources/")
          .then((response) => {
            const filteredResources = response.data.filter(
              (resource) => resource.availablenumber < resource.threshold
            );
            setFilteredCurrentResources(filteredResources);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
      

      useEffect(() => {
        axios
          .get("http://localhost:8070/staticresources/")
          .then((response) => {
            setStaticResources(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

      
      useEffect(() => {
        axios
          .get("http://localhost:8070/substaticresources/")
          .then((response) => {
            setSubStaticResources(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

      const totalCurrentResources = currentresources.length;
      const totalStaticResources = staticresources.length;
      const totalSubStaticResources = substaticresources.length;
      const totalfilteredcurrentresources = filteredcurrentresources.length;
      const totalResources = (totalCurrentResources + totalStaticResources);

    return( 
        <center>
            <div>
                <div className="main-div">
                    <div className="container pt-1 mt-5">
                     
                        <div className="row pt-2">

                        <div className="col-sm-4">
                            <div className="card bg-info">
                                <div class="card-body">
                                    <h4 class="card-title">Total <br/>Current Resources</h4>
                                    <p class="card-text h4">{totalCurrentResources}</p>
                                </div>
                            </div>  
                        </div>

                        <div className="col-sm-4">
                            <div className="card bg-info">
                                <div class="card-body">
                                    <h4 class="card-title">Total <br/>Static Resources</h4>
                                    <p class="card-text h4">{totalStaticResources}</p>
                                </div>
                            </div>  
                        </div>
                        
                       <div className="col-sm-4">
                            <div className="card bg-info">
                                <div class="card-body">
                                    <h4 class="card-title">Total <br/>Substatic Resources</h4>
                                    <p class="card-text h4">{totalSubStaticResources}</p>
                                </div>
                            </div>
                            
                        
                        </div>
                        </div>

                         <div className="row pt-2 mt-5">

                        <div className="col-sm-4">
                            <div className="card bg-info">
                                <div class="card-body">
                                    <h4 class="card-title">Total <br/>Total Resources</h4>
                                    <p class="card-text h4">{totalResources}</p>
                                </div>
                            </div>  
                        </div>

                        <div className="col-sm-8">
                            <div className="card bg-info">
                                <div class="card-body">
                                    <h4 class="card-title">Total <br/>Resources below Threshold</h4>
                                    <p class="card-text h4">{totalfilteredcurrentresources}</p>
                                </div>
                            </div>  
                        </div>

                        </div>
                    </div>
                </div>
            </div>
        </center>
    )
}


export default ResourceHome;