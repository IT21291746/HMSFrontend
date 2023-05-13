import React,{useState} from "react";
import axios from "axios"

export default function AddCurrentResources(){

    const [csid, setCSID] = useState("");
    const [name, setName] = useState("");
    const [availablenumber, setAvailableNumber] = useState();
    const [threshold, setThreshold] = useState(0);
    const [unitprice, setUnitPrice] = useState(0);
    

function sendData(e){
    e.preventDefault();
    
    const newCurrentResources = {
        csid,
        name,
        availablenumber,
        threshold,
        unitprice,
    }

    axios.post("http://localhost:8070/currentresources/add", newCurrentResources).then(()=>{
        alert("CurrentResources Added")
        window.location.href='/viewAllResources';

        setCSID("");
        setName("");
        setAvailableNumber(0);
        setThreshold(0);
        setUnitPrice(0);

    }).catch((err)=>{
        alert(err)
    })
}

    return(
        <div className="main-div">
          <div className="container">
            <div className="row">
            <div className="col-12 col-sm-8 col-md-8 m-auto">
          <h2>Add New CurrentResources</h2>
          <form onSubmit={sendData}> 

            <div className="mb-3">
              <label for="csid" className="form-label">CurrentResources ID</label>
              <input type="text" className="form-control" id="csid" onChange={(e)=>{setCSID(e.target.value);}}></input>
            </div>

            <div className="mb-3">
              <label for="name" className="form-label">CurrentResources Name</label>
              <input type="text" className="form-control" id="name" onChange={(e)=>{setName(e.target.value);}}></input>
            </div>


            <div className="mb-3">
              <label for="availablenumber" className="form-label">Available Number</label>
              <input type="number" className="form-control" id="availablenumber" onChange={(e)=>{setAvailableNumber(e.target.value);}}></input>
            </div>

            <div className="mb-3">
              <label for="threshold" className="form-label">Threshold</label>
              <input type="number" className="form-control" id="threshold" onChange={(e)=>{setThreshold(e.target.value);}}></input>
            </div>

            
            <div className="mb-3">
              <label for="unitprice" className="form-label">Unit Price</label>
              <input type="number" className="form-control" id="unitprice" onChange={(e)=>{setUnitPrice(e.target.value);}}></input>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          </div>
          </div> 
          </div> 
        </div>
    )
}



