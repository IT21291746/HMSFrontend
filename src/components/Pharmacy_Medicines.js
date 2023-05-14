import React, { useState, useEffect } from "react";
import axios from "axios";

function Pharmacy_Medicine() {
  const [medicine, setMedicine] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/medicine/")
      .then((response) => {
        setMedicine(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8070/medicine/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        setMedicine(medicine.filter((medicine) => medicine._id !== id));
        alert("Medicine Deleted")
      })
      .catch((error) => {
        console.log(error);
      });};

  return (
    <center>
    <div className="main-div">
      <h2>All Medicines</h2>
      <button className="btn btn-warning btn-create"><a href="/addMedicine">Add New Medicines</a></button>
      <table>
        <thead>
          <tr>
            <th>Medicine ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Dosage</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {medicine.map((medicine) => (
            <tr key={medicine._id}>
              <td>{medicine.medicine_id}</td>
              <td>{medicine.name}</td>
              <td>{medicine.price}</td>
              <td>{medicine.dosage}</td>
              <td>{medicine.quantity}</td>
              <td><button type="submit" className="btn btn-success"><a href={"/updateMedicine/"+medicine._id}>Edit</a></button>
              <button type="submit" className="btn btn-danger" onClick={() => handleDelete(medicine._id)}>Delete</button></td>
              
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </center>
  );
}

export default Pharmacy_Medicine;
