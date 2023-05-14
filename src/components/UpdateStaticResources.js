import React, { useState,useEffect } from "react";
import axios from "axios";
import{useParams} from 'react-router-dom';

function UpdateStaticResources() {
  const {id} = useParams();
  const [staticresources, setStaticResources] = useState([]);
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
    <div className="container pt-1">
                <div className="row">
                  <div className="col-12 col-sm-08  col-md-9 m-auto">
                    <div className="card border-0 shadow">
                      <div className="card-body">
                        <center>  
                          <h2>Update Current Resources</h2>
                        </center> 
        <form onSubmit={handleUpdate}>

          <div className="mb-3 mt-3">
          <label className="form-label" >StaticResources ID:</label>
          <input className="form-control" type="text" value={staticresources.srid} />
          </div>
          <div className="mb-3">
          <label className="form-label" >Name:</label>
          <input className="form-control" type="text" required placeholder={staticresources.name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div  className="mb-3">
          <label className="form-label" >AvailableNumber:</label>
          <input
          className="form-control"
            type="number" required
            placeholder={staticresources.availablenumber}
            onChange={(e) => setAvailableNumber(e.target.value)}
          />
          </div>
          <button className="btn btn-success mb-3" type="submit">Update StaticResources</button>
        </form>
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default UpdateStaticResources;
