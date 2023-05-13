import React, { useState, useEffect } from "react";
import axios from "axios";

function ViewEmployee() {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/employee/")
      .then((response) => {
        setEmployee(response.data);
      }) 
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8070/employee/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        setEmployee(employee.filter((employee) => employee._id !== id));
        alert("Employee Deleted")
      })
      .catch((error) => {
        console.log(error);
      });};

      const totalEmployees = employee.length;
  return (
    <center>
      <div>
    <div className="main-div">
      <h2>All Laboratory Employees ({totalEmployees})</h2>
      <button className="btn btn-warning btn-create"><a href="/addEmployee">Create New Employee</a></button>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>sex</th>
            <th>Age</th>
            <th>Address</th>
            <th>Contact Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.employee_id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.sex}</td>
              <td>{employee.age}</td>
              <td>{employee.address}</td>
              <td>{employee.contact_number}</td>
              <td><button type="submit" className="btn btn-success"><a href={"/updateEmployee/"+employee._id}>Edit</a></button>
              <button type="submit" className="btn btn-danger" onClick={() => handleDelete(employee._id)}>Delete</button></td>
              
            </tr>
          ))}
        </tbody>
      </table>

      <div> 
      </div>
    </div>
    </div>
    </center>
  );
}

export default ViewEmployee;
