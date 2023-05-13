import React, { useState, useEffect} from "react";
import axios from "axios";
import{useParams} from 'react-router-dom';


export default function AddResult(){
    const {id} = useParams();
    const [result_id, setResultID] = useState("");
    const [order, setOrder] = useState([]);
    const [status, setStatus] = useState("");
    const [patient, setPatient] = useState([]);
    const [patient_id, setPatientID] = useState("");
    const [reportUrl, setReportUrl] = useState("");


    useEffect(() => {
      generateResultId();
    }, []);
  
    function generateResultId() {
      axios
        .post("http://localhost:8070/result/maxId")
        .then((response) => {
          const maxId = response.data.maxId;
          const newId = "RID_" + (parseInt(maxId.substring(4)) + 1);
          setResultID(newId);
        })
        .catch((err) => {
          alert(err);
        });
    }
  
  

    

    useEffect(()=>{
      axios.post(`http://localhost:8070/order/findOne/${id}`).then((res)=> {
        setOrder(res.data);
      }).catch((err)=>{
        console.log(err);
        alert("Error with retriving data");
      });
    },[id]);



  useEffect(() => {   
    axios
      .get("http://localhost:8070/patient/")
      .then((response) => {
        setPatient(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



    
function sendData(e){
    e.preventDefault();
    
    const newResult = {
        result_id,
        order_id : order.order_id,
        testtype : order.testtype,
        patient_id : order.patient_id,
        status : "Pending"
    }

    axios.post("http://localhost:8070/result/add", newResult).then(()=>{
        alert("Result Added")
        window.location.href='/viewResult';

        setResultID("");
        setStatus("");
        setPatientID("");

    }).catch((err)=>{
        alert(err)
    })

    axios
    .put(`http://localhost:8070/order/update/${id}`, {
      reportUrl: "SET", // set the report URL to the newly created report URL
    })
    .then((response) => {
      console.log(response.data);
      console.log(reportUrl)
      setOrder({ ...order, reportUrl: reportUrl }); // update the order state with the new report URL
    })
    .catch((error) => {
      console.log(error);
    });
}

    return(
        <div className="main-div">
          <div className="container pt-1">
      
      <div className="row">
        <div className="col-12 col-sm-08  col-md-9 m-auto">
          <div className="card border-0 shadow">
          <div className="card-body">
          <center>  
          <h2>Create New Report</h2>
          </center>
          <form onSubmit={sendData}> 
            <div className="mb-3">
              <label for="resultId" className="form-label">Report ID</label>
              <input type="text" required className="form-control" id="resultId" value={result_id} readOnly></input>
            </div>

            <div className="mb-3">
              <label for="orderId" className="form-label">Order ID</label>
              <input type="text" required className="form-control" id="orderId" value={order.order_id} readOnly></input>
            </div>

            <div className="mb-3">
              <label for="patientId" className="form-label">Patient ID</label>
              <input type="text" required className="form-control" id="patientId" value={order.patient_id} readOnly></input>
            </div>

            <div className="mb-3">
              <label for="testtype" className="form-label">Test Type</label>
              <input type="text" required className="form-control" id="testtype" value={order.testtype} readOnly></input>
            </div>


            <div className="mb-3">
              <label for="status" className="form-label">Status</label>
              <select className="form-select">
                <option value={"Pending"} readOnly>Pending</option>
              </select>
           
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}



