import React, { useState, useEffect } from "react";
import axios from "axios";
function DoctorHome(){

    const [doctor, setDoctor] = useState([]);

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
        <center>
            <div>
                <div className="main-div">
                <div className="box-class">                    
    <div class="row">
        <div class="col-sm-3">
          <div class="well">
            <h4>Total Doctors</h4>
            <p>{totalDoctors} Doctors</p> 
          </div>
        </div>
        <div class="col-sm-3">
          <div class="well">
            <h4>Pending Reports</h4>
            <p>100 Million</p> 
          </div>
        </div>
        <div class="col-sm-3">
          <div class="well">
            <h4>Completed</h4>
            <p>10 Million</p> 
          </div>
        </div>
        <div class="col-sm-3">
          <div class="well">
            <h4>Urgent Reports</h4>
            <p>30%</p> 
          </div>
        </div>
      </div>
      <div className="btn-div"> 
                        <button className="btn-new"><a href="/addResult">Create New Report</a></button>
                        <button className="btn-new"><a href="/viewResult">View Reports</a></button>
                    </div>
                </div>
                </div>
            </div>
        </center>
    )
}


export default DoctorHome;