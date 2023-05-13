import React, { useState, useEffect } from "react";
import axios from "axios";

function ViewCurrentResources() {
  const [currentresources, setCurrentResources] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/currentresources/")
      .then((response) => {
        setCurrentResources(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8070/currentresources/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        setCurrentResources(currentresources.filter((currentresources) => currentresources._id !== id));
        alert("CurrentResources Deleted")
      })
      .catch((error) => {
        console.log(error);
      });};

      const totalCurrentResourcess = currentresources.length;

  return (
    <center>
    <div className="main-div">
      <h2>All CurrentResourcess ({totalCurrentResourcess})</h2>
      <button className="btn btn-warning btn-create"><a href="/addCurrentResources">Add New CurrentResources</a></button>
      <table>
        <thead>
          <tr>
            <th>CurrentResources ID</th>
            <th>Name</th>
            <th>Available Number</th>
            <th>Threshold</th>
            <th>UnitPrice</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentresources.map((currentresources) => (
            <tr key={currentresources._id}>
              <td>{currentresources.csid}</td>
              <td>{currentresources.name}</td>
              <td>{currentresources.availablenumber}</td>
              <td>{currentresources.threshold}</td>
              <td>{currentresources.unitprice}</td>
              <td><button type="submit" className="btn btn-success"><a href={"/updateCurrentResources/"+currentresources._id}>Edit</a></button>              
              <button type="submit" className="btn btn-danger" onClick={() => handleDelete(currentresources._id)}>Delete</button></td>
              
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </center>
  );
}

export default ViewCurrentResources;
