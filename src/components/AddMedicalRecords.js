import React,{useState} from "react";
import axios from "axios"

export default function AddMedicalRecords(){

    const [patient_id, setPatientID] = useState("");
    const [medicalrecords, setMedicalRecords] = useState("");

    function sendData(e){
    e.preventDefault();
    
    const newMedicalRecords = {
        patient_id,
        medicalrecords,
    }

    axios.post("http://localhost:8070/medicalrecords/add", newMedicalRecords).then(()=>{
        alert("MedicalRecords Added")

        setPatientID("");
        setMedicalRecords("");


    }).catch((err)=>{
        alert(err)
    })
}

    return(
        <div classMedicalRecords="main-div">
          <div classMedicalRecords="container">
            <div classMedicalRecords="row">
            <div classMedicalRecords="col-12 col-sm-8 col-md-8 m-auto">
          <h2>Create New MedicalRecords Profile</h2>
          <form onSubmit={sendData}> 
            <div classMedicalRecords="mb-3">
              <label for="patientid" classMedicalRecords="form-label">Patient ID</label>
              <input type="text" classMedicalRecords="form-control" id="patientid" onChange={(e)=>{setPatientID(e.target.value);}}></input>
            </div>

            <div classMedicalRecords="mb-3">
              <label for="medicalrecords" classMedicalRecords="form-label">Medical Records</label>
              <input type="text" classMedicalRecords="form-control" id="medicalrecords" onChange={(e)=>{setMedicalRecords(e.target.value);}}></input>
            </div>


            <button type="submit" classMedicalRecords="btn btn-primary">Submit</button>
          </form>
          </div>
          </div> 
          </div> 
        </div>
    )
}



