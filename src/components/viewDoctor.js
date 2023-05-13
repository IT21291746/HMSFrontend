import React, { useState, useEffect } from "react";
import axios from "axios";

function ViewDoctor() {
  const [doctor, setDoctor] = useState([]);

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

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8070/doctor/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        setDoctor(doctor.filter((doctor) => doctor._id !== id));
        alert("Doctor Deleted")
      })
      .catch((error) => {
        console.log(error);
      });};

      const totalDoctors = doctor.length;

  return (
    <center>
    <div className="main-div">
      <h2>All Doctors ({totalDoctors})</h2>
      <button className="btn btn-warning btn-create"><a href="/addDoctor">Create New Doctor</a></button>
      <table>
        <thead>
          <tr>
            <th>Doctor ID</th>
            <th>Name</th>
            <th>Specialization</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Contact Number</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctor.map((doctor) => (
            <tr key={doctor._id}>
              <td>{doctor.doctor_id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.age}</td>
              <td>{doctor.gender}</td>
              <td>{doctor.contact_number}</td>
              <td>{doctor.password}</td>
              <td><button type="submit" className="btn btn-success"><a href={"/updateDoctor/"+doctor._id}>Edit</a></button>              
              <button type="submit" className="btn btn-danger" onClick={() => handleDelete(doctor._id)}>Delete</button></td>
              
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </center>
  );
}

export default ViewDoctor;
