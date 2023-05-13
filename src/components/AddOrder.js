import React,{useState , useEffect} from "react";
import axios from "axios"

export default function AddOrder(){

    const [order_id, setOrderID] = useState("");
    const [patient_id, setPatientID] = useState("");
    const [doctor_id, setDoctorID] = useState("");
    const [status, setStatus] = useState("");
    const [testtype, setTestType] = useState("");
    const [priority, setPriority] = useState("Low");
    const [patient, setPatient] = useState([]);
    const [doctor, setDoctor] = useState([]);

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

    useEffect(() => {   
      axios
        .get("http://localhost:8070/doctor/")
        .then((response) => {
          setDoctor(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

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
    
    const newOrder = {
        order_id,
        doctor_id,
        patient_id,
        testtype,
        priority,
        status : "Pending"
    }

    axios.post("http://localhost:8070/order/add", newOrder).then(()=>{
        alert("Order Added")
        window.location.href='/order';

        setOrderID("");
        setPatientID("");
        setDoctorID("");
        setPriority("");
        setTestType("");
        setStatus("");
    }).catch((err)=>{
        alert(err)
    })
}

    return(
        <div className="main-div">
          <div className="container pt-1">
      
      <div className="row">
        <div className="col-12 col-sm-08  col-md-9 m-auto">
          <div className="card border-0 shadow">
          <div className="card-body">
          <center>  
          <h2>Create New Order</h2>
          </center>
          <form onSubmit={sendData}>
            
            <div className="mb-3">
              <label for="orderId" className="form-label">Order ID</label>
              <input type="text" className="form-control" id="orderId" value={order_id} readOnly></input>
            </div>

            <div className="mb-3">
                <label for="patient" className="form-label">Patient ID</label>
                
                <select  required className="form-control" id="patient_id" onChange={(e)=>{setPatientID(e.target.value);}}>
                <option selected>Select Patient ID</option>
                {patient.map((patient) => (
                  <option key={patient._id} value={patient.patient_id}>{patient.patient_id}</option>
                
                ))}
                </select>
              </div>

              <div className="mb-3">
                <label for="doctor" className="form-label">Doctor ID</label>
                
                <select  required className="form-control" id="doctor" onChange={(e)=>{setDoctorID(e.target.value);}}>
                <option selected>Select Doctor ID</option>
                {doctor.map((doctor) => (
                  <option key={doctor._id} value={doctor.doctor_id}>{doctor.doctor_id}</option>
                
                ))}
                </select>
              </div>

              <div className="mb-3">
                <label for="testtype" className="form-label" >Test Type</label>
                <select className="form-control" id="testtype" required onChange={(e)=>{setTestType(e.target.value);}}>
                    <option selected>Select Type of the Test</option>
                    <option value="Full Blood Count">Full Blood Count</option>
                    <option value="Urine Test">Urine Test</option>
                    <option value="Serum Creatinine Test">Serum Creatinine Test</option>
                </select>
              </div>

              <div className="mb-3">
                <label for="priority" className="form-label" >Select Priority</label><br/>
                <input type="radio" checked id="priority" name="priority" value="Low" onChange={(e)=>{setPriority(e.target.value);}}/>Low
                <input type="radio" id="priority" name="priority" value="Medium" onChange={(e)=>{setPriority(e.target.value);}}/>Medium
                <input type="radio" id="priority" name="priority" value="High" onChange={(e)=>{setPriority(e.target.value);}}/>High
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



