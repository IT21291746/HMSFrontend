import React, { useState,useEffect } from "react";
import axios from "axios";
import{ useParams} from 'react-router-dom';

function UpdateOrder() {
  const {id} = useParams();
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(()=>{
    axios.post(`http://localhost:8070/order/findOne/${id}`).then((res)=> {
      setOrder(res.data);
    }).catch((err)=>{
      console.log(err);
      setErrorMessage("Error with retrieving data");
    });
  },[id]);


function handleUpdate(e){
  const UpdatedOrder = {
      status,
    };
    axios
      .put(`http://localhost:8070/order/update/`+id,UpdatedOrder)
      .then((response) => {
        console.log(response.data);
        setErrorMessage("Order Updated");
        window.location.href='/order';
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
      <div className="container pt-1">
      
        <div className="row">
          <div className="col-12 col-sm-08  col-md-8 m-auto">
            <div className="card border-0 shadow">
            <div className="card-body">
            <center>  
            <h2>Update Order</h2>
            </center>
        <form onSubmit={handleUpdate}>
          <div className="mb-3 mt-3">
            <label className="form-label">Order ID:</label>
            <input  className="form-control" type="text" value={order.order_id}/>
          </div>
          
          <div className="mb-3">
            <label className="form-label">Doctor ID:</label>
            <input className="form-control" type="text" value={order.doctor_id}/>
          </div>
          
          <div className="mb-3">
            <label className="form-label">Patient ID:</label>
            <input className="form-control" type="text" value={order.patient_id}/>
          </div>

          <div className="mb-3">
            <label className="form-label">Test Type:</label>
            <input className="form-control" type="text" value={order.testtype}/>
          </div>

          <div  className="mb-3">
            <label className="form-label">Priority:</label>
            <input className="form-control" type="text" value={order.priority}/>
          </div>

          <div className="mb-3">
            <label className="form-label">Status:</label>
            <select className="form-select" onChange={(e) => setStatus(e.target.value)}>
              <option value={"Pending"}>Pending</option>
              <option value={"Assign"}>Assign</option>
              <option value={"Completed"}>Completed</option>
            </select>
          </div>

          <button type="submit" className="btn  btn-success">Update Order</button>
        </form>
      </div>
      </div>
      </div>
      </div>
      </div>.
      

    </div>
    
  );
}

export default UpdateOrder;
