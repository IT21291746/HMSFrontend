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
    <center>
      <h2>Update CurrentResources</h2>
      <div>
        <form onSubmit={handleUpdate}>
          <label>CurrentResources ID:</label>
          <input type="text" value={currentresources.csid} />
          <br />
          <br />
          <label>Name:</label>
          <input type="text" placeholder={currentresources.name} onChange={(e) => setName(e.target.value)} />
          <br />
          <br />
          <label>AvailableNumber:</label>
          <input
            type="number" required
            placeholder={currentresources.availablenumber}
            onChange={(e) => setAvailableNumber(e.target.value)}
          />
          <br />
          <br />
          <label>Threshold:</label>
          <input type="number" placeholder={currentresources.threshold} onChange={(e) => setThreshold(e.target.value)} />
          <br />
          <br />
          <label>UnitPrice:</label>
          <input type="number" placeholder={currentresources.unitprice} onChange={(e) => setUnitPrice(e.target.value)} />
          <br />
          <br />
          <button type="submit">Update CurrentResources</button>
        </form>
      </div>
    </center>
    </div>
  );
}

export default UpdateCurrentResources;
