import React, { useState, useEffect } from "react";
import axios from "axios";

function Resource_Order() {

  const [currentresources, setCurrentResources] = useState([]);
  const [csid, setCSID] = useState("");
  const [name, setName] = useState("");
  const [availablenumber, setAvailableNumber] = useState();
  const [requestedamount, setRequestedAmount] = useState();
  const [threshold, setThreshold] = useState(0);
  const [unitprice, setUnitPrice] = useState(0);
  const [showaddstockrequest, setShowAddStockresource] = useState(false);
  const [newCRRequest, setNewCRRequest] = useState([]);
  
  
  useEffect(() => {
    axios
      .get("http://localhost:8070/currentresources/")
      .then((response) => {
        const filteredResources = response.data.filter(
          (resource) => resource.availablenumber < resource.threshold
        );
        setCurrentResources(filteredResources);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function sendData(e){
    e.preventDefault();
    
    const newCurrentResourcesRequest = {
        csid : newCRRequest.csid,
        name : newCRRequest.name,
        availablenumber : newCRRequest.availablenumber,
        requestedamount,
        threshold : newCRRequest.threshold,
        unitprice : newCRRequest.unitprice,
    }

    axios.post("http://localhost:8070/stockrequest/add", newCurrentResourcesRequest).then(()=>{
        alert("Request Saved")

        setCSID("");
        setName("");
        setAvailableNumber(0);
        setRequestedAmount(0);
        setThreshold(0);
        setUnitPrice(0);

    }).catch((err)=>{
        alert(err)
    })
}

const fetchCurrentResources = async (id) => {
  try {
    const response = await axios.post(`http://localhost:8070/currentresources/findOne/${id}`);
    setNewCRRequest(response.data);
    setShowAddStockresource(true);
  } catch (error) {
    console.log(error);
    alert("Error with retrieving data");
  }
};


  return (
    <div className="main-div">
        <div className="container mt-5">
          <div className="row">
            <table>
              <thead>
                <tr>
                  <th>Resource ID</th>
                  <th>Resource Name</th>
                  <th>Threshold</th>
                  <th>Available Number</th>
                  <th>Unit Price</th>
                  <th>Action</th>
                </tr>
              </thead>
          {currentresources.map((resource) => (
            <tbody key={resource._id}>
              <tr>
                <td>{resource.csid}</td>
                <td>{resource.name}</td>
                <td>{resource.threshold}</td>
                <td>{resource.availablenumber}</td>
                <td>{resource.unitprice}</td>
                <td>
                    <button className="btn btn-danger" onClick={() => fetchCurrentResources(resource._id)}>Order New Stock</button>
                    <button className="btn btn-info"><a href={"/updateCurrentResources/"+resource._id}>Add New Stock</a></button>
                </td>
              </tr>
            </tbody>
          ))}
            </table>
            {showaddstockrequest &&  
            <div className="container mt-5">
              <div className="col-12 col-sm-08  col-md-5 m-auto">
                <div className="card border-0 shadow">
                  <div className="card-body">
                    <center>  
                      <h2>Request New Stock</h2>
                    </center>
                    <form onSubmit={sendData}>
                      <div className="mb-3 mt-3">
                        <label className="form-label">Enter Required Amount : </label>
                        <input type="number" className="form-control" onChange={(e)=>{setRequestedAmount(e.target.value);}} placeholder="Enter Reqiured Amount"/> 

                        <button type="submit" className="btn btn-danger mt-3">Submit</button>
                      </div>
                    </form>
                  </div>    
                </div>
              </div>
            </div>

            }

          </div>
        </div>

    </div>
  );
}

export default Resource_Order;
