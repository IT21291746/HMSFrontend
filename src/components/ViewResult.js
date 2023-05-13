import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from 'file-saver';

function ViewResult() {
  const [result, setResult] = useState([]);

  const [reportUrl, setReportUrl] = useState(null);
  
  const [showAllReports, setShowAllReports] = useState(true);
  const [showPendingReports, setShowPendingReports] = useState(false);
  const [showCompletedReports, setShowCompletedReports] = useState(false);

  const pendingresult = Array.isArray(result) ? result.filter((result) => result.status === "Pending") : [];
  const completedresult = Array.isArray(result) ? result.filter((result) => result.status === "Completed") : [];


  useEffect(()=>{
    axios.get(`http://localhost:8070/result/`).then((res)=> {
      setResult(res.data);
    }).catch((err)=>{
      console.log(err);
      alert("Error with retriving data");
    });
  });

 



  const fetchAllReports = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/result/`);
      setResult(response.data);
      setShowPendingReports(false);
      setShowCompletedReports(false);
      setShowAllReports(true);
      console.log(response.data)
    } catch (error) {
      console.log(error);
      alert("Error with retrieving records");
    }
  };

  const fetchPendingReports = async () => {
    try {
      setShowPendingReports(true);
      setShowCompletedReports(false);
      setShowAllReports(false);
    } catch (error) {
      console.log(error);
      alert("Error with retrieving records");
    }
  };

  const fetchCompletedReports = async () => {
    try {
      setShowPendingReports(false);
      setShowCompletedReports(true);
      setShowAllReports(false);
    } catch (error) {
      console.log(error);
      alert("Error with retrieving records");
    }
  };

 


  const HandleDelete = async (id) => {
    try {
      const response = await axios.post(`http://localhost:8070/result/findByID/${id}`);
      const newResult = response.data;
      console.log(newResult);
      console.log(newResult.order_id);
  
      const orderResponse = await axios.post(`http://localhost:8070/order/findbyRID/${newResult.order_id}`);
      const order = orderResponse.data;
      console.log(order._id);
      console.log(order)
  
      const updateOrderResponse = await axios.put(`http://localhost:8070/order/update/${order._id}`, {
        
        reportUrl, // set the report URL to the newly created report URL
      });
      console.log(order);
      console.log(updateOrderResponse.data);
  
      const deleteResultResponse = await axios.delete(`http://localhost:8070/result/delete/${id}`);
      console.log(deleteResultResponse.data);
  
      setResult(result.filter((result) => result._id !== id));
      setReportUrl(null);
      alert("Result Deleted");
    } catch (error) {
      console.log(error);
      alert("Error with retrieving or deleting data");
    }
  };
  
  


      const handleDownload = (result) => {
        axios.get(`http://localhost:8070/result/report/${result._id}`, { responseType: 'arraybuffer' })
          .then((response) => {
            alert("Dowload is starting now");
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            saveAs(pdfBlob, `result_${result.result_id}.pdf`);
          })
          .catch((error) => {
            console.log(error);
          });
      };

  return (
    <center>
      <div>
    <div className="main-div">
      <div className="container">
      <div className="row">
        <div className="col-sm-12">
        <div class="btn-group">
          <button type="button" class="btn btn-primary" onClick={()=>fetchAllReports()}>All</button>
          <button type="button" class="btn btn-primary" onClick={()=>fetchPendingReports()}>Pending</button>
          <button type="button" class="btn btn-primary" onClick={()=>fetchCompletedReports()}>Completed</button>
        </div>
        </div>
      </div>
      </div>
{showAllReports &&
      <div>

      <h2>All Results</h2>
      <table>
        <thead>
          <tr>
            <th>Result ID</th>
            <th>Order ID</th>
            <th>Patient ID</th>
            <th>Test Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {result.map && result
          .map((result) => (
            <tr key={result._id}>
              <td>{result.result_id}</td>
              <td>{result.order_id}</td>
              <td>{result.patient_id}</td>
              <td>{result.testtype}</td>
              <td>{result.status}</td>
              <td>
                <button type="submit" className="btn btn-success"><a href={"/updateResult/"+result._id}>Edit</a></button>
                <button type="submit" className="btn btn-danger" onClick={() => HandleDelete(result._id)}>Delete</button>              </td>
              
            </tr>
          ))}
        </tbody>
      </table>

      </div>
}


{showPendingReports &&
      <div>

      <h2>Pending Results</h2>
      <table>
        <thead>
          <tr>
            <th>Result ID</th>
            <th>Order ID</th>
            <th>Patient ID</th>
            <th>Test Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingresult.map((pendingresult) => (
            <tr key={pendingresult._id}>
              <td>{pendingresult.result_id}</td>
              <td>{pendingresult.order_id}</td>
              <td>{pendingresult.patient_id}</td>
              <td>{pendingresult.testtype}</td>
              <td>{pendingresult.status}</td>
              <td>
                <button type="submit" className="btn btn-success"><a href={"/updateResult/"+pendingresult._id}>Edit</a></button>
                <button type="submit" className="btn btn-danger" onClick={() => HandleDelete(pendingresult._id)}>Delete</button>              </td>
              
            </tr>
          ))}
        </tbody>
      </table>

      </div>
}



{showCompletedReports &&
      <div>

      <h2>Completed Results</h2>
      <table>
        <thead>
          <tr>
            <th>Result ID</th>
            <th>Order ID</th>
            <th>Patient ID</th>
            <th>Test Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {completedresult.map((completedresult) => (
            <tr key={completedresult._id}>
              <td>{completedresult.result_id}</td>
              <td>{completedresult.order_id}</td>
              <td>{completedresult.patient_id}</td>
              <td>{completedresult.testtype}</td>
              <td>{completedresult.status}</td>
              <td>
                <button type="submit" className="btn btn-success"><a href={"/updateResult/"+completedresult._id}>Edit</a></button>
                <button type="submit" className="btn btn-danger" onClick={() => HandleDelete(completedresult._id)}>Delete</button>
                <button type="submit" className="btn btn-primary" onClick={() => handleDownload(completedresult)}>Download</button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>

      </div>
}

      <div> 
      </div>
    </div>
    </div>
    </center>
  );
}

export default ViewResult;
