import React, { useState,useEffect } from "react";
import axios from "axios";
import{useParams} from 'react-router-dom';

function UpdateStaticResources() {
  const {id} = useParams();
  const [staticresources, setStaticResources] = useState([]);
  const [srid, setSRID] = useState("");
  const [name, setName] = useState("");
  const [availablenumber, setAvailableNumber] = useState("");

  useEffect(()=>{
    axios.post(`http://localhost:8070/staticresources/findOne/${id}`).then((res)=> {
      setStaticResources(res.data);
    }).catch((err)=>{
      console.log(err);
      alert("Error with retriving data");
    });
  },[id]);


function handleUpdate(e){
  const UpdatedStaticResources = {
      srid : staticresources.srid,
      name,
      availablenumber,
    };
    axios
      .put(`http://localhost:8070/staticresources/update/`+id,UpdatedStaticResources)
      .then((response) => {
        console.log(response.data);
        alert("StaticResources Updated");
        window.location.href='/viewAllResources';
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main-div">
    <center>
      <h2>Update StaticResources</h2>
      <div>
        <form onSubmit={handleUpdate}>
          <label>StaticResources ID:</label>
          <input type="text" value={staticresources.srid} />
          <br />
          <br />
          <label>Name:</label>
          <input type="text" required placeholder={staticresources.name} onChange={(e) => setName(e.target.value)} />
          <br />
          <br />
          <label>AvailableNumber:</label>
          <input
            type="number" required
            placeholder={staticresources.availablenumber}
            onChange={(e) => setAvailableNumber(e.target.value)}
          />
          <br />
          <br />
          <br />
          <br />
          <button type="submit">Update StaticResources</button>
        </form>
      </div>
    </center>
    </div>
  );
}

export default UpdateStaticResources;
