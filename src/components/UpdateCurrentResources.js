import React, { useState,useEffect } from "react";
import axios from "axios";
import{useParams} from 'react-router-dom';

function UpdateCurrentResources() {
  const {id} = useParams();
  const [currentresources, setCurrentResources] = useState([]);
  const [csid, setCSID] = useState("");
  const [name, setName] = useState("");
  const [availablenumber, setAvailableNumber] = useState("");
  const [threshold, setThreshold] = useState("");
  const [unitprice, setUnitPrice] = useState("");

  useEffect(()=>{
    axios.post(`http://localhost:8070/currentresources/findOne/${id}`).then((res)=> {
      setCurrentResources(res.data);
    }).catch((err)=>{
      console.log(err);
      alert("Error with retriving data");
    });
  },[id]);


function handleUpdate(e){
  const UpdatedCurrentResources = {
      csid : csid || currentresources.csid,
      name : name || currentresources.name,
      availablenumber,
      threshold : threshold ||currentresources.threshold,
      unitprice : unitprice || currentresources.unitprice,
    };
    axios
      .put(`http://localhost:8070/currentresources/update/`+id,UpdatedCurrentResources)
      .then((response) => {
        console.log(response.data);
        alert("CurrentResources Updated");
        window.location.href='/viewAllResources';
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main-div">
    <div className="container pt-1">
                <div className="row">
                  <div className="col-12 col-sm-08  col-md-9 m-auto">
                    <div className="card border-0 shadow">
                      <div className="card-body">
                        <center>  
                          <h2>Update Current Resources</h2>
                        </center> 
        <form onSubmit={handleUpdate}>
          <div className="mt-3 mb-3">
          <label className="form-label">CurrentResources ID:</label>
          <input type="text" className="form-control" value={currentresources.csid} />
          </div>
          <div className="mb-3">
          <label className="for-label">Name:</label>
          <input type="text" className="form-control" placeholder={currentresources.name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
          <label className="for-label">AvailableNumber:</label>
          <input
            type="number" required
            className="form-control"
            placeholder={currentresources.availablenumber}
            onChange={(e) => setAvailableNumber(e.target.value)}
          />
          </div>
          <div className="mb-3">
          <label className="frorm-label">Threshold:</label>
          <input type="number" className="form-control" placeholder={currentresources.threshold} onChange={(e) => setThreshold(e.target.value)} />
          </div>
          <div className="mb-3">
          <label className="for-label">UnitPrice:</label>
          <input type="number" className="form-control" placeholder={currentresources.unitprice} onChange={(e) => setUnitPrice(e.target.value)} />
          </div>
          <button className="btn btn-primary mb-3" type="submit">Update CurrentResources</button>
        </form>
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default UpdateCurrentResources;
