import React, { useState, useEffect } from "react";
import axios from "axios";
function PharmacyHome(){

    const [result, setResult] = useState([]);
    const [order, setOrder] = useState([]);
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


  useEffect(() => {
    axios
      .get("http://localhost:8070/order/")
      .then((response) => {
        setOrder(response.data);
        
      }) 
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const pendingresult = result.filter((result) => result.status === "Pending");
  const completedresult = result.filter((result) => result.status === "Completed");

  const pendingorder = order.filter((order) => order.status === "Pending");
  const completedorder = order.filter((order) => order.status === "Completed");


  const totalResults = result.length;
  const totalPendingResults = pendingresult.length;
  const totalCompletedResults = completedresult.length;
  
  const totalOrders = order.length;
  const totalPendingOrders = pendingorder.length;
  const totalCompletedOrders = completedorder.length;
    return( 
        <div className="main-div">
            <center>                
                <div className="container-fluid p-5 my-5 bg-white rounded-4 shadow-lg p-4 mb-4 border border-danger border-3">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="card bg-info">
                                <div class="card-body">
                                    <h4 class="card-title">Total Reports</h4>
                                    <p class="card-text h4">{totalResults}</p>
                                </div>
                            </div>  
                        </div>
                        <div className="col-sm-4">
                        <div className="card bg-info">
                                
                                <div class="card-body">
                                    <h4 class="card-title">Pending Reports</h4>
                                    <p class="card-text h4">{totalPendingResults}</p>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                        <div className="card bg-info">
                                <div class="card-body">
                                    <h4 class="card-title">Completed Reports</h4>
                                    <p class="card-text h4">{totalCompletedResults}</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row pt-5">
                        <div className="col-sm-6">
                        <div className="card bg-info">
                                
                                <div class="card-body">
                                    <h4 class="card-title">Urgent Orders</h4>
                                    <p class="card-text h4">{totalPendingOrders}</p>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                        <div className="card bg-info">
                                <div class="card-body">
                                    <h4 class="card-title">Completed Orders</h4>
                                    <p class="card-text h4">{totalCompletedOrders}</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row pt-5">
                        <div className="col-sm-4">
                            <div className="card bg-info">
                                <div class="card-body">
                                    <h4 class="card-title">Total Orders</h4>
                                    <p class="card-text h4">{totalOrders}</p>

                                </div>
                            </div>  
                        </div>
                        <div className="col-sm-4">
                        <div className="card bg-info">
                                
                                <div class="card-body">
                                    <h4 class="card-title">Pending Orders</h4>
                                    <p class="card-text h4">{totalPendingOrders}</p>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                        <div className="card bg-info">
                                <div class="card-body">
                                    <h4 class="card-title">Completed Orders</h4>
                                    <p class="card-text h4">{totalCompletedOrders}</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                </center>

        </div>
    )
}


export default PharmacyHome;