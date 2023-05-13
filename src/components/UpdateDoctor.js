import React, { useState,useEffect } from "react";
import axios from "axios";
import{useParams} from 'react-router-dom';

function UpdateDoctor() {
  const {id} = useParams();
  const [doctor, setDoctor] = useState([]);
  const [doctor_id, setDoctorId] = useState("");
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [password, setPassword] = useState("");

  useEffect(()=>{
    axios.post(`http://localhost:8070/doctor/findOne/${id}`).then((res)=> {
      setDoctor(res.data);
    }).catch((err)=>{
      console.log(err);
      alert("Error with retriving data");
    });
  },[id]); 


function handleUpdate(e){
  const UpdatedDoctor = {
      doctor_id,
      name,
      specialization,
      age,
      gender,
      contact_number,
      password
    };
    axios
      .put(`http://localhost:8070/doctor/update/`+id,UpdatedDoctor)
      .then((response) => {
        console.log(response.data);
        alert("Doctor Updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main-div">
    <center>
      <h2>Update Doctor</h2>
      <div>
        <form onSubmit={handleUpdate}>
          <label>Doctor ID:</label>
          <input type="text" placeholder={doctor.doctor_id} onChange={(e) => setDoctorId(e.target.value)} />
          <br />
          <br />
          <label>Name:</label>
          <input type="text" placeholder={doctor.name} onChange={(e) => setName(e.target.value)} />
          <br />
          <br />
          <label>Specialization:</label>
          <input
            type="text"
            placeholder={doctor.specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />
          <br />
          <br />
          <label>Age:</label>
          <input type="number" placeholder={doctor.age} onChange={(e) => setAge(e.target.value)} />
          <br />
          <br />
          <label>Gender:</label>
          <input type="text" placeholder={doctor.gender} onChange={(e) => setGender(e.target.value)} />
          <br />
          <br />
          <label>Contact Number:</label>
          <input
            type="text"
            placeholder={doctor.contact_number}
            onChange={(e) => setContactNumber(e.target.value)}
          />
          <br />
          <br />
          <label>Password:</label>
          <input
            type="text"
            placeholder={doctor.password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Update Doctor</button>
        </form>
      </div>
    </center>
    </div>
  );
}

export default UpdateDoctor;
