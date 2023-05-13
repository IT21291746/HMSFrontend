import React, { useState,useEffect } from "react";
import axios from "axios";
import{useParams} from 'react-router-dom';



function UpdateResult() {
  const {id} = useParams();
  const [result, setResult] = useState([]);
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");



  useEffect(()=>{
    axios.post(`http://localhost:8070/result/findbyID/${id}`).then((res)=> {
      setResult(res.data);
    }).catch((err)=>{
      console.log(err);
      setErrorMessage("Error with retrieving data");
    });
  },[id]);



  
function handleUpdate(e){
  e.preventDefault();
  const UpdatedResult = {
      status,
    };
    axios
      .put(`http://localhost:8070/result/update/`+id,UpdatedResult)
      .then((response) => {
        console.log(response.data);
        setErrorMessage("Result Updated");
        window.location.href='/viewResult';
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Error updating result");
      });
  };

  return (
    <div className="main-div">
      
      {errorMessage && <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>}
      <div>
      <div className="container pt-1">
      <div className="row">
        <div className="col-12 col-sm-08  col-md-9 m-auto">
          <div className="card border-0 shadow">
          <div className="card-body">
          <center>  
          <h2>Update Result</h2>
          </center>
    
        <form onSubmit={handleUpdate}>
          <div className="mb-3 mt-3">
          <label className="form-label">Result ID:</label>
          <input className="form-control" type="text" value={result.result_id}/>
          </div>

          <div className="mb-3">
          <label className="form-label">Order ID:</label>
          <input className="form-control"  type="text" value={result.order_id}/>
          </div>

          <div className="mb-3">
          <label className="form-label">Patient ID:</label>
          <input className="form-control"  type="text" value={result.patient_id}/>
          </div>

          <div className="mb-3">
          <label className="form-label">Test Type:</label>
          <input  className="form-control" type="text" value={result.testtype}/>
          </div>

          <div className="mb-3">
          <label className="form-label">Status:</label>
          <select  className="form-select" onChange={(e) => setStatus(e.target.value)}>
                <option value={"Pending"}>Pending</option>
                <option value={"Assign"}>Assign</option>
                <option value={"Completed"}>Completed</option>
          </select>
          </div>

          <button type="submit" className="btn btn-success">Update Result</button>
        </form>
      </div>
      </div>
      </div>

      </div>
    </div>
    </div>
    </div>
  );
}

export default UpdateResult;
