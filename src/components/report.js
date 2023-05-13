import React, { useState, useEffect } from "react";
import axios from "axios";
function Report(){

  
  const [result, setResult] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8070/result/")
      .then((response) => {
        setResult(response.data);
        
      }) 
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const pendingresult = result.filter((result) => result.status === "Pending");
  const completedresult = result.filter((result) => result.status === "Completed");

  const totalResults = result.length;
  const totalPendingResults = pendingresult.length;
  const totalCompletedResults = completedresult.length;

    return( 
      <div className="main-div">
      <div className="container-fluid p-5 my-5 bg-gray text-white">
          <div className="row">
              <div className="col-sm-4">
                  <div className="card">
                      <div class="card-body">
                          <h4 class="card-title">Total Reports</h4>
                          <p class="card-text h4">{totalResults}</p>
                          <a href="/viewResult" class="btn btn-primary">View More</a>
                      </div>
                  </div>  
              </div>
              <div className="col-sm-4">
              <div className="card">
                      
                      <div class="card-body">
                          <h4 class="card-title">Pending Reports</h4>
                          <p class="card-text h4">{totalPendingResults}</p>
                          <a href="#" class="btn btn-primary">View More</a>
                      </div>
                  </div>
              </div>
              <div className="col-sm-4">
              <div className="card">
                      <div class="card-body">
                          <h4 class="card-title">Completed Reports</h4>
                          <p class="card-text h4">{totalCompletedResults}</p>
                          <a href="#" class="btn btn-primary">View More</a>
                      </div>
                  </div>
              </div>
          </div>
          <div className="container my-5 ">
                <div className="row">
                    <div className="col-sm-6"> 
                        <button className="btn btn-lg bg-danger"><a href="/addResult">Create New Report</a></button>
                    </div>
                    <div className="col-sm-6"> 
                        <button className="btn btn-lg bg-danger"><a href="/viewResult">View Reports</a></button>
                    </div>
                </div>
                </div>
          
      </div>
  
</div>
    )
}

export default Report;