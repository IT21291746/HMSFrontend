import React, { useState, useEffect } from "react";
import axios from "axios";

function ViewStaticResources() {
  const [staticresources, setStaticResources] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/staticresources/")
      .then((response) => {
        setStaticResources(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8070/staticresources/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        setStaticResources(staticresources.filter((staticresources) => staticresources._id !== id));
        alert("StaticResources Deleted")
      })
      .catch((error) => {
        console.log(error);
      });};

      const totalStaticResourcess = staticresources.length;

  return (
    <center>
    <div className="main-div">
      <h2>All StaticResourcess ({totalStaticResourcess})</h2>
      <button className="btn btn-warning btn-create"><a href="/addStaticResources">Add New StaticResources</a></button>
      <table>
        <thead>
          <tr>
            <th>StaticResources ID</th>
            <th>Name</th>
            <th>Available Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {staticresources.map((staticresources) => (
            <tr key={staticresources._id}>
              <td>{staticresources.srid}</td>
              <td>{staticresources.name}</td>
              <td>{staticresources.availablenumber}</td>
              <td><button type="submit" className="btn btn-success"><a href={"/updateStaticResources/"+staticresources._id}>Edit</a></button>              
              <button type="submit" className="btn btn-danger" onClick={() => handleDelete(staticresources._id)}>Delete</button></td>
              
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </center>
  );
}

export default ViewStaticResources;
