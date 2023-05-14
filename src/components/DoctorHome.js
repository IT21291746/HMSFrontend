import React, { useState, useEffect } from "react";
import axios from "axios";
function DoctorHome(){

    const [doctor, setDoctor] = useState([]);
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);

    const pendingorders = orders.filter((order) => order.status === "Completed").length;

    useEffect(() => {
      const loggedInUsers = JSON.parse(localStorage.getItem("loggedInUser"));
    
      if (loggedInUsers) {
        axios
          .post(`http://localhost:8070/doctor/findOne/${loggedInUsers.loggedInUser._id}`)
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      
      const fetchLabOrders = async (pid) => {
        try {
          const response = await axios.post(`http://localhost:8070/order/findbyId/${pid}`);
          setOrders(response.data);
        } catch (error) {
          console.log(error);
          alert("Error with retrieving medical records");
        }
      };
      
      if (user && user.doctor_id) {
        fetchLabOrders(user.doctor_id);
      }
    }, [user]);
     

  useEffect(() => {
    axios
      .get("http://localhost:8070/doctor/")
      .then((response) => {
        setDoctor(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const totalDoctors = doctor.length;

    return( 
                <div className="main-div">
                  <center>
                                    {/* <h4 className="text-white" >Welcome Dr.{user.name}</h4> */}
                                    </center>
 
                  <div className="container pt-1 mt-5">
                         <div className="row pt-2">

                        <div className="col-sm-8">
                            <div className="card bg-info">
                                <div className="card-body">
                                    <h4 class="card-title">Total Appointment <h4 className="float-end">5</h4></h4>
                                    <p class="card-text h4"></p>
                                </div>
                            </div>  
                        </div>

                        <div className="col-sm-4">
                            <div className="card bg-info">
                                <div class="card-body">
                                    <h4 class="card-title">Pending Appointments <h4 className="float-end">3</h4></h4>
                                    <p class="card-text h4"></p>
                                </div>
                            </div>  
                        </div>
                        
                            
                        
                        </div>
                        </div>

                         <div className="row pt-2 mt-5">

                        <div className="col-sm-4">
                            <div className="card bg-info">
                                <div class="card-body">
                                    <h4 class="card-title">Pending Lab Requests <h4 className="float-end">{pendingorders}</h4></h4>
                                    <p class="card-text h4"></p>
                                </div>
                            </div>  
                        </div>

                        <div className="col-sm-8">
                            <div className="card bg-info">
                                <div class="card-body">
                                    <h4 class="card-title">Competed Orders <h4 className="float-end">4</h4></h4>
                                    <p class="card-text h4"></p>
                                </div>
                            </div>  
                        </div>

                        </div>
                    </div>
                
    )
}


export default DoctorHome;