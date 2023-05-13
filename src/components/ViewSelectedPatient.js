import React, { useState, useEffect } from "react";
import axios from "axios";
import{useParams} from 'react-router-dom';

function ViewSelectedPatient() {
  const {id} = useParams();
  const [patient, setPatient] = useState({});
  const [patientdata, setPatientData] = useState([]);
  const [patient_id, setPatientID] = useState("");
  const [medicine, setMedicine] = useState("");
  const [testtype, setTestType] = useState("");
  const [status, setStatus] = useState("");
  const [medicalrecords, setMedicalRecords] = useState([]);
  const [showMedicalRecords, setShowMedicalRecords] = useState(false);
  const [showLabTest, setShowLabTest] = useState(false);
  const [prescription, setPrescription] = useState([]);
  const [showPrescription, setShowPrescription] = useState(false);
  const [orders, setOrders] = useState([]);
  const [order_id, setOrderID] = useState("");
  const [priority, setPriority] = useState("Low");

  useEffect(()=>{
    axios.post(`http://localhost:8070/patient/findOne/${id}`).then((res)=> {
      setPatientData(res.data);
      setPatient([res.data]);
    }).catch((err)=>{
      console.log(err);
      alert("Error with retriving data");
    });
  },[id]);


  
 
  useEffect(() => {
    generateOrderId();
  }, []);

  function generateOrderId() {
    axios
      .post("http://localhost:8070/order/maxId")
      .then((response) => {
        const maxId = response.data.maxId;
        const newId = "OID_" + (parseInt(maxId.substring(4)) + 1);
        setOrderID(newId);
      })
      .catch((err) => {
        alert(err);
      });
  }



  function sendData(e){
    e.preventDefault();
    
    const newMedicalRecords = {
        patient_id : patientdata.patient_id,
        medicalrecords,
    }
    setMedicalRecords([...medicalrecords, newMedicalRecords]);

    axios.post("http://localhost:8070/medicalrecords/add", newMedicalRecords).then(()=>{
        alert("MedicalRecords Added")
        fetchMedicalRecords(patientdata.patient_id);
        setPatientID("");
        setMedicalRecords("");


    }).catch((err)=>{
        alert(err)
    })
}


const [user, setUser] = useState(null);

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





function sendOrderData(e){
  e.preventDefault();
  
  const newOrder = {
      order_id,
      doctor_id  :user.doctor_id,
      patient_id : patientdata.patient_id,
      testtype,
      priority,
      status : "Pending"
  }
  

  axios.post("http://localhost:8070/order/add", newOrder).then(()=>{
      alert("Request sent to Laboratory")
      fetchLabOrders(patientdata.patient_id);
      setPatientID("");
      setOrders("");


  }).catch((err)=>{
      alert(err)
  })
}

function sendPrescription(e){
  e.preventDefault();
  
  const newPrescription = {
      doctor_id  :user.doctor_id,
      patient_id : patientdata.patient_id,
      medicine,
  }
  

  axios.post("http://localhost:8070/prescription/add", newPrescription).then(()=>{
      alert("Request Added")
      fetchPrescriptions(patientdata.patient_id);
      setPatientID("");


  }).catch((err)=>{
      alert(err)
  })
}


const fetchMedicalRecords = async (pid) => {
  try {
    console.log(pid)
    const response = await axios.post(`http://localhost:8070/medicalrecords/findbyId/${pid}`);
    setMedicalRecords(response.data);
    console.log(response.data)
    setShowLabTest(false);
    setShowPrescription(false);
    setShowMedicalRecords(true);
  } catch (error) {
    console.log(error);
    alert("Error with retrieving medical records");
  }
};


const fetchLabOrders = async (pid) => {
  try {
    const response = await axios.post(`http://localhost:8070/order/findbyId/${pid}`);
    setOrders(response.data);
    setShowMedicalRecords(false);
    setShowPrescription(false);
    setShowLabTest(true);
    console.log(response.data)
  } catch (error) {
    console.log(error);
    alert("Error with retrieving medical records");
  }
};

const fetchPrescriptions = async (pid) => {
  try {
    const response = await axios.post(`http://localhost:8070/prescription/findbyId/${pid}`);
    setPrescription(response.data);
    setShowMedicalRecords(false);
    setShowLabTest(false);
    setShowPrescription(true);
    console.log(response.data)
  } catch (error) {
    console.log(error);
    alert("Error with retrieving medical records");
  }
};

  useEffect(()=>{
    axios.post(`http://localhost:8070/patient/findOne/${id}`).then((res)=> {
      setPatient([res.data]);
    }).catch((err)=>{
      console.log(err);
      alert("Error with retriving data");
    });
  },[id]);

  const handleDelete = (recordID) => {
    axios
      .delete(`http://localhost:8070/medicalrecords/delete/${recordID}`)
      .then((response) => {
        console.log(response.data);
        setMedicalRecords(medicalrecords.filter((medicalrecords) => medicalrecords._id !== recordID));
        alert("Record Deleted")
      })
      .catch((error) => {
        console.log(error);
      });};

      const handleDeleteLabTest = (recordID) => {
        axios
          .delete(`http://localhost:8070/order/delete/${recordID}`)
          .then((response) => {
            console.log(response.data);
            setMedicalRecords(medicalrecords.filter((medicalrecords) => medicalrecords._id !== recordID));
            alert("Record Deleted")
            fetchLabOrders(patientdata.patient_id);
          })
          .catch((error) => {
            console.log(error);
          });};

          const handleDeletePrescription = (recordID) => {
            axios
              .delete(`http://localhost:8070/prescription/delete/${recordID}`)
              .then((response) => {
                console.log(response.data);
                setPrescription(prescription.filter((prescription) => prescription._id !== recordID));
                alert("Record Deleted")
                fetchPrescriptions(id);
              })
              .catch((error) => {
                console.log(error);
              });};
    





  return (
<div>
      
    {patient &&  patient.map && patient.map((patient) => (
    <div className="main-div" key={patient._id}>
    
      <table > 
        
          <tr>
            <th>Patient ID</th>
            <td>{patient.patient_id}</td>
            </tr>
            <tr>
            <th>Name</th>
            <td>{patient.name}</td>
            </tr>
            <tr>
            <th>sex</th>
            <td>{patient.sex}</td>
            </tr>
            <tr>
            <th>Age</th>
            <td>{patient.age}</td>

            </tr>
            <tr>
            <th>Address</th>
            <td>{patient.address}</td>

            </tr>
            <tr>
            <th>Contact Number</th>
            <td>{patient.contact_number}</td>

            </tr>

            
                      
      </table>

      <br/><br/><br/><br/>
            <button type="submit" className="btn btn-success" onClick={()=>fetchMedicalRecords(patientdata.patient_id)}>Medical Records</button>
            <button type="submit" className="btn btn-success" onClick={() => fetchLabOrders(patientdata.patient_id)} >Request Lab Test</button>
            <button type="submit" className="btn btn-success" onClick={()=>fetchPrescriptions(patientdata.patient_id)}>Prescibe Medicines</button>
            <div>

            {showMedicalRecords &&
            <div>
              <div className="btn-options container"> 
                <table>
                  {medicalrecords && medicalrecords.map && medicalrecords.map(record => (
                  <tr className="container" key={record._id}>
                    <td>{record.medicalrecords}</td>
                    <td><button type="submit" className="btn btn-danger" onClick={()=> handleDelete(record._id)}>Delete</button></td>
                  </tr>
                  ))}
                </table>
              </div>
              
              <div className="container pt-1">
                <div className="row">
                  <div className="col-12 col-sm-08  col-md-9 m-auto">
                    <div className="card border-0 shadow">
                      <div className="card-body">
                        <center>  
                          <h2>New Medical Record</h2>
                        </center> 
                        <form onSubmit={sendData}> 
                          <div classMedicalRecords="mb-3">
                            <label for="medicalrecords" classMedicalRecords="form-label">Add New Medical Records</label>
                            <input className="form-control" required type="text" classMedicalRecords="form-control" id="medicalrecords" onChange={(e)=>{setMedicalRecords(e.target.value);}}></input>
                          </div>
                          <button className="btn btn-success" type="submit" classMedicalRecords="btn btn-primary">Add New Record</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              }



              {showLabTest &&
               
              <div>
              
                <div>  
              <div className="btn-options container"> 
                    <table>
                    <tr>
                    <th>Test Type</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Action</th>
                    </tr>

                    {orders && orders.map && orders.map(labtest => (
                        <tbody className="container" key={labtest._id}>
                          <tr>
                          
                            <td>{labtest.testtype}</td>
                            <td>{labtest.priority}</td>
                            <td>{labtest.status}</td>
                            
                            <td><button type="submit" className="btn btn-danger" onClick={()=> handleDeleteLabTest(labtest._id)}>Delete</button></td>
                          </tr> 
                        </tbody>
                    ))}
                    
                    </table>
              </div>
            
            
            
              <div className="container mt-3 pt-1">
                <div className="row">
                  <div className="col-12 col-sm-08  col-md-9 m-auto">
                    <div className="card border-0 shadow">
                      <div className="card-body">
                        <center>  
                          <h2>Send New Order to Laboratory</h2>
                        </center> 
                        <form onSubmit={sendOrderData} > 
                        
                        <div classMedicalRecords="mb-3">

                        <div className="mb-3">
                          <label for="orderId" className="form-label">Order ID</label>
                          <input type="text" className="form-control" id="orderId" value={order_id} readOnly></input>
                        </div>

                        <label for="medicalrecords" classMedicalRecords="form-label">Request New Medical Test</label>
                        <select className="form-select" required onChange={(e)=>{setTestType(e.target.value);}}>
                          <option selected>Select Type of the Test</option>
                          <option value="Full Blood Count">Full Blood Count</option>
                          <option value="Urine Test">Urine Test</option>
                          <option value="Serum Creatinine Test">Serum Creatinine Test</option>
                        </select>

                          <div className="mt-3 form-label">
                            <label for="priority" className="form-label" >Priority</label><br/>
                          </div>
                          <div className="mb-3 form-check">
                            <label htmlFor="low" className="form-check-label"></label>
                            <input type="radio" className="form-check-input" checked id="low" name="priority" value="Low" onChange={(e)=>{setPriority(e.target.value);}}/>Low
                          </div>
                          <div className="mb-3 form-check">    
                            <label htmlFor="medium" className="form-check-label"></label>
                            <input type="radio" id="medium" name="priority"  className="form-check-input" value="Medium" onChange={(e)=>{setPriority(e.target.value);}}/>Medium
                          </div>
                          <div className="mb-3 form-check">   
                            <label htmlFor="high" className="form-check-label"></label>
                            <input type="radio" id="high" name="priority" value="High"  className="form-check-input" onChange={(e)=>{setPriority(e.target.value);}}/>High
                          </div>

                        <button className="btn btn-success" type="submit" classMedicalRecords="btn btn-primary">Request New Lab Test</button>

                        </div>
                      </form>
                </div>
                
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
              }


{showPrescription &&
               
               <div>
               
                 <div>  
               <div className="btn-options container"> 
                     <table>
                     <tr>
                     <th>Medicines</th>
                     <th>Action</th>
                     </tr>
 
                     {prescription && prescription.map && prescription.map(prescription => (
                         <tbody className="container" key={prescription._id}>
                           <tr>
                           
                             <td>{prescription.medicine}</td>
                             <td><button type="submit" className="btn btn-danger" onClick={()=> handleDeletePrescription(prescription._id)}>Delete</button></td>
                           </tr> 
                         </tbody>
                     ))}
                     
                     </table>
               </div>
             
             
             
                 <div className="btn-options container"> 
                         <form onSubmit={sendPrescription}> 
                         <div classMedicalRecords="mb-3">
                           <label for="medicalrecords" classMedicalRecords="form-label">Add New Prescription</label>
                         <input type="text" className="form-control" required onChange={(e)=>{setMedicine(e.target.value);}}/>
                         <button className="btn btn-success" type="submit" classMedicalRecords="btn btn-primary">Request New Lab Test</button>
 
                         </div>
                       </form>
                 </div>
                 
                 </div>
                 
                 </div>
               }

              
              </div>
              </div>

    ))}
    </div>
  );
  
}

export default ViewSelectedPatient;
