import React, { useState, useEffect } from "react";
import axios from "axios";

function ViewPatient() {
  const [patient, setPatient] = useState([]);

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

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8070/patient/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        setPatient(patient.filter((patient) => patient._id !== id));
        alert("Patient Deleted")
      })
      .catch((error) => {
        console.log(error);
      });};

  return (
    <center>
    <div className="main-div">
      <h2>All Patient</h2>
      <table>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Name</th>
            <th>sex</th>
            <th>Age</th>
            <th>Address</th>
            <th>Contact Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patient.map((patient) => (
            <tr key={patient._id}>
              <td>{patient.patient_id}</td>
              <td>{patient.name}</td>
              <td>{patient.sex}</td>
              <td>{patient.age}</td>
              <td>{patient.address}</td>
              <td>{patient.contact_number}</td>
              <td>
                <button type="submit" className="btn btn-success"><a href={"/viewSelectedPatient/"+patient._id}>Select</a></button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>

      <div> 
      </div>
    </div> 
    </center>
  );
}

export default ViewPatient;
