import React, { useState, useEffect } from "react";
import axios from "axios";

function ViewAllResources() {
  const [currentresources, setCurrentResources] = useState([]);
  const [staticresources, setStaticResources] = useState([]);

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



  const handleDeleteCurrentResources = (id) => {
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

      const handleDeleteStaticResources = (id) => {
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
    

      const totalCurrentResources = currentresources.length;
      const totalStaticResources = staticresources.length;
      const totalResources = (totalCurrentResources + totalStaticResources);

  return (
    <center>
    <div className="main-div">
      <h2>All Resourcess ({totalResources})</h2>
      <br/>
      <br/>
      <div>
      <h2>All Current Resourcess ({totalCurrentResources})</h2>

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
              <button type="submit" className="btn btn-danger" onClick={() => handleDeleteCurrentResources(currentresources._id)}>Delete</button></td>
              
              
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <br/><br/><br/><br/>

      <div>
      <h2>All StaticResourcess ({totalStaticResources})</h2>
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
              <button type="submit" className="btn btn-danger" onClick={() => handleDeleteStaticResources(staticresources._id)}>Delete</button>
                <button type="submit" className="btn btn-success"><a href={"/viewSelectedStaticResources/"+staticresources._id}>Select</a></button>
              </td>
              
              
              
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    </div>
    </center>
  );
}

export default ViewAllResources;
