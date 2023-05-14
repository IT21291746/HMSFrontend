import React, { useState, useEffect } from "react";
import axios from "axios";

function Pharmacy_Prescription() {
  const [prescription, setPrescription] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/prescription/")
      .then((response) => {
        setPrescription(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <center>
    <div className="main-div">
      <h2>All Prescriptions</h2>
      <table>
        <thead>
          <tr>
            <th>Doctor ID</th>
            <th>Patient ID</th>
            <th>Medicines</th>
          </tr>
        </thead>
        <tbody>
          {prescription.map((prescription) => (
            <tr key={prescription._id}>
              <td>{prescription.doctor_id}</td>
              <td>{prescription.patient_id}</td>
              <td>{prescription.medicine}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </center>
  );
}

export default Pharmacy_Prescription;
