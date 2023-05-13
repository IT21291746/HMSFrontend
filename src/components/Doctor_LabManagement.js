import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from 'file-saver';

function Doctor_LabManagement() {

    const [showlabrequests, setShowLabRequests] = useState(true);
    const [showlabreports, setShowLabReports] = useState(false);
    const [user, setUser] = useState(null);
    const [order, setOrder] = useState([]);
    const [result, setResult] = useState([]);

    const completedorders = Array.isArray(order) ? order.filter((order) => order.status === "Completed") : [];

    useEffect(() => {

        const loggedInUsers = JSON.parse(localStorage.getItem("loggedInUser"));
      
        if (loggedInUsers) {
          axios
            .post(`http://localhost:8070/doctor/findOne/${loggedInUsers.loggedInUser._id}`)
            .then((response) => {
              console.log(response)
              setUser(response.data);
            }) 
            .catch((error) => {
              console.log(error);
            });
        }
      }, []);

      useEffect(()=>{
        axios.get(`http://localhost:8070/result/`).then((res)=> {
          setResult(res.data);
        }).catch((err)=>{
          console.log(err);
          alert("Error with retriving data");
        });
      });

      const fetchLabRequests = async (id) => {
        try {
          const response = await axios.post(`http://localhost:8070/order/findbyDID/${id}`);
          setOrder(response.data);
          setShowLabReports(false);
          setShowLabRequests(true);      
        } catch (error) {
          console.log(error);
          alert("Error with retrieving medical records");
        }
      };

      const downloadLabReports = async (id) => {
        try {
          const response = await axios.post(`http://localhost:8070/order/findbyDID/${id}`);
          setOrder(response.data);
          setShowLabReports(true);
          setShowLabRequests(false);      
        } catch (error) {
          console.log(error);
          alert("Error with retrieving medical records");
        }
      };

      const handleDownload = (result) => {
        axios.get(`http://localhost:8070/result/report/download/${result.order_id}`, { responseType: 'arraybuffer' })
          .then((response) => {
            alert("Dowload is starting now");
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            saveAs(pdfBlob, `Result_${result.patient_id}.pdf`);
          })
          .catch((error) => {
            console.log(error);
          });
      };


  return (
    <div className="main-div">
        <div className="container">
            <div className="row">
                <div className="col-sm-6">
                <center>
                    <button className="btn btn-danger" onClick={()=>fetchLabRequests(user.doctor_id)} >View Lab Requests</button>
                    </center>
                </div>
                <div className="col-sm-6">
                    <center>
                    <button className="btn btn-danger" onClick={()=>downloadLabReports(user.doctor_id)}>Download Lab Reports</button>
                    </center>
                </div>

                {showlabrequests && 
                    <div className="mt-5">
                        <table>
                            <tr>
                                <th>Order ID</th>
                                <th>Patient ID</th>
                                <th>Test Type</th>
                                <th>Status</th>
                                <th>Priority</th>
                            </tr>

                            {order && order.map && order.map(order=>(
                                <tbody>
                                    <tr>
                                        <td>{order.order_id}</td>
                                        <td>{order.patient_id}</td>
                                        <td>{order.testtype}</td>
                                        <td>{order.status}</td>
                                        <td>{order.priority}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                }

                {showlabreports && 
                    <div className="mt-5">
                        <table>
                            <tr>
                                <th>Order ID</th>
                                <th>Patient ID</th>
                                <th>Test Type</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Download</th>
                            </tr>

                            {completedorders && completedorders.map && completedorders.map(completedorders=>(
                                <tbody>
                                    <tr>
                                        <td>{completedorders.order_id}</td>
                                        <td>{completedorders.patient_id}</td>
                                        <td>{completedorders.testtype}</td>
                                        <td>{completedorders.status}</td>
                                        <td>{completedorders.priority}</td>
                                        <td><button className="btn btn-info" onClick={() => handleDownload(completedorders)}>Download</button></td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                }

            </div>

        </div>
    </div>
  );
}

export default Doctor_LabManagement;
