import React, { useState,useEffect } from "react";
import axios from "axios";
import{useParams} from 'react-router-dom';

function UpdatePatient() {
  const {id} = useParams();
  const [patient, setPatient] = useState([]);
  const [patient_id, setPatientId] = useState("");
  const [name, setName] = useState("");
  const [sex, setGender] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [contact_number, setContactNumber] = useState("");

  useEffect(()=>{
    axios.post(`http://localhost:8070/patient/findOne/${id}`).then((res)=> {
      setPatient(res.data);
    }).catch((err)=>{
      console.log(err);
      alert("Error with retriving data");
    });
  },[id]);


function handleUpdate(e){
  const UpdatedPatient = {
      patient_id,
      name,
      sex,
      age,
      address,
      contact_number,
    };
    axios
      .put(`http://localhost:8070/patient/update/`+id,UpdatedPatient)
      .then((response) => {
        console.log(response.data);
        alert("Patient Updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <center>
      <div className="main-div">
      <h2>Update Patient</h2>
      <div>
        <form onSubmit={handleUpdate}>
          <label>Patient ID:</label>
          <input type="text" placeholder={patient.patient_id} onChange={(e) => setPatientId(e.target.value)} />
          <br />
          <br />
          <label>Name:</label>
          <input type="text" placeholder={patient.name} onChange={(e) => setName(e.target.value)} />
          <br />
          <br />
          <label>Gender:</label>
          <input
            type="text"
            placeholder={patient.sex}
            onChange={(e) => setGender(e.target.value)}
          />
          <br />
          <br />
          <label>Age:</label>
          <input type="number" placeholder={patient.age} onChange={(e) => setAge(e.target.value)} />
          <br />
          <br />
          <label>Address:</label>
          <input type="text" placeholder={patient.address} onChange={(e) => setAddress(e.target.value)} />
          <br />
          <br />
          <label>Contact Number:</label>
          <input
            type="text"
            placeholder={patient.contact_number}
            onChange={(e) => setContactNumber(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Update Patient</button>
        </form>
      </div>
      </div>
    </center>
  );
}

export default UpdatePatient;
