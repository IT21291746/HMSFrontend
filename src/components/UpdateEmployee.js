import React, { useState,useEffect } from "react";
import axios from "axios";
import{useParams} from 'react-router-dom';

function UpdateEmployee() {
  const {id} = useParams();
  const [employee, setEmployee] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sex, setGender] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [contact_number, setContactNumber] = useState("");

  useEffect(()=>{
    axios.post(`http://localhost:8070/employee/findOne/${id}`).then((res)=> {
      setEmployee(res.data);
      setName(res.data.name);
        setEmail(res.data.email);
        setPassword(res.data.password);
        setGender(res.data.sex);
        setAge(res.data.age);
        setAddress(res.data.address);
        setContactNumber(res.data.contact_number);
    }).catch((err)=>{
      console.log(err);
      alert("Error with retriving data");
    });
  },[id]);


function handleUpdate(e){
  const UpdatedEmployee = {
    name: name || employee.name,
      email: email || employee.email,
      password: password || employee.password,
      age: age || employee.age,
      address: address || employee.address,
      contact_number: contact_number || employee.contact_number,
    };
    axios
      .put(`http://localhost:8070/employee/update/`+id,UpdatedEmployee)
      .then((response) => {
        console.log(response.data);
        alert("Employee Updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main-div">
      <div className="container pt-1">
      
      <div className="row">
        <div className="col-12 col-sm-08  col-md-9 m-auto">
          <div className="card border-0 shadow">
          <div className="card-body">
          <center>  
          <h2>Update Employee</h2>
          </center>
      <div>
        <form onSubmit={handleUpdate}>
        <div className="mb-3 mt-3">
        <label className="form-label">Employee ID:</label>
        <input className="form-control" type="text" value={employee.employee_id} readOnly/>          
        </div>

        <div className="mb-3">
        <label className="form-label">Name:</label>
          <input className="form-control"  type="text" placeholder={employee.name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="mb-3">
        <label className="form-label">Email:</label>
          <input className="form-control"  type="emaill" placeholder={employee.email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mb-3">
        <label className="form-label">Password:</label>
          <input  className="form-control" type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" placeholder={employee.password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div>
        <label className="form-label">Gender:</label>
          <input className="form-control"  type="text" placeholder={employee.sex} readOnly/> 
        </div>

        <div className="mb-3">
        <label className="form-label">Age:</label>
          <input  className="form-control" type="number" placeholder={employee.age} onChange={(e) => setAge(e.target.value)} />
        </div>

        <div className="mb-3">
        <label className="form-label">Address:</label>
          <input  className="form-control" type="text" placeholder={employee.address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div className="mb-3">
        <label className="form-label">Contact Number:</label>
          <input  className="form-control" type="text" placeholder={employee.contact_number} onChange={(e) => setContactNumber(e.target.value)} />
        </div>
          <button type="submit">Update Employee</button>
        </form>
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default UpdateEmployee;
