import React,{useState ,useEffect} from "react";
import axios from "axios"

export default function AddPatient(){

    const [patient_id, setPatientId] = useState("");
    const [name, setName] = useState("");
    const [sex, setSex] = useState("");
    const [age, setAge] = useState(0);
    const [address, setAddress] = useState("");
    const [contact_number, setContactNumber] = useState("");

    useEffect(() => {
      generatePatientId();
    }, []);
  
    function generatePatientId() {
      axios
        .post("http://localhost:8070/patient/maxId")
        .then((response) => {
          const maxId = response.data.maxId;
          const newId = "PID_" + (parseInt(maxId.substring(4)) + 1);
          setPatientId(newId);
        })
        .catch((err) => {
          alert(err);
        });
    }
  
  


function sendData(e){
    e.preventDefault();
    
    const newPatient = {
        patient_id,
        name,
        sex,
        age,
        address,
        contact_number
    }

    axios.post("http://localhost:8070/patient/add", newPatient).then(()=>{
        alert("Patient Added")

        setPatientId("");
        setName("");
        setAge("");
        setAddress("");
        setContactNumber("");
        setSex("");



    }).catch((err)=>{
        alert(err)
    })
}

    return(
        <div className="main-div">
          <h2>Create New Patient Profile</h2>
          <form onSubmit={sendData}> 
            <div className="mb-3">
              <label for="patientId" className="form-label">Patient ID</label>
              <input type="text" className="form-control" id="patientId" value={patient_id} readOnly></input>
            </div>

            <div className="mb-3">
              <label for="name" className="form-label">Patient Name</label>
              <input type="text" className="form-control" id="name" onChange={(e)=>{setName(e.target.value);}}></input>
            </div>

            <div className="mb-3">
              <label for="sex" className="form-label">Gender</label>
              <select className="form-control" id="sex" onChange={(e)=>{setSex(e.target.value);}} required>
               <option>Select Gender</option>
               <option value="Male" onChange={(e)=>{setSex(e.target.value);}}>Male</option>
               <option value="Female" onChange={(e)=>{setSex(e.target.value);}}>Female</option>
              </select>
            </div>

            <div className="mb-3">
              <label for="age" className="form-label">Age</label>
              <input type="number" className="form-control" id="age" onChange={(e)=>{setAge(e.target.value);}}></input>
            </div>

            <div className="mb-3">
              <label for="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" onChange={(e)=>{setAddress(e.target.value);}}></input>
            </div>

            <div className="mb-3">
              <label for="contactNumber" className="form-label">Mobile Number</label>
              <input type="text" className="form-control" id="contactNumber" onChange={(e)=>{setContactNumber(e.target.value);}}></input>    
            </div>
              
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
    )
}



