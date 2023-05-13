import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";

function DoctorProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {

    const loggedInUsers = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUsers) {
      axios
        .post(`http://localhost:8070/doctor/findOne/${loggedInUsers.loggedInUser._id}`)
        .then((response) => {
          console.log("Done")
          setUser(response.data);
        }) 
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleDelete = (id) => {
    
      
    const confirmed = window.confirm("Are you sure you want to delete you profile?");
    
    if (confirmed) {
    localStorage.removeItem("loggedInUser");
    navigate("/");
    axios
    
      .delete(`http://localhost:8070/doctor/delete/${id}`)
      .then((response) => {
        
      })
      .catch((error) => {
        console.log(error);
          });
    };}
  return (
    <center>
      <div>
    <div className="main-div">
    <div className="container">
            <div className="row">
            <div className="col-12 col-sm-8 col-md-8 m-auto">
          
      <h2>My Profile</h2>
      {user ?(
      
            <div>
              <table>
                <tr>
              <td>Doctor ID : {user.doctor_id}</td>
              </tr>
              <tr>
              <td>Name : {user.name}</td>
              </tr>
              <tr>
              <td>Specialization : {user.specialization}</td>
              </tr>
              <tr>
              <td>Gender : {user.gender}</td>
              </tr>
              <tr>
              <td>Age : {user.age}</td>
              </tr>
              <tr>
              <td>Mobile Number :  {user.contact_number}</td>
              </tr>
              <tr>
              <td>Password :  {user.password}</td>
              </tr>
              <tr>
              <td><button type="submit" className="btn btn-success"><a href={"/updateEmployee/"+user._id}>Edit</a></button>
              <button type="submit" className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button></td>
              </tr>
              </table>
              </div>
      ):(
        <div>
          Loading......
        </div>
      )}
      <div>
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    
    </center>
  );
}

export default DoctorProfile;
