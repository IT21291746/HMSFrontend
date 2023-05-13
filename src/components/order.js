import React, { useState, useEffect } from "react";
import axios from "axios";

function useViewOrder() {
  const [order, setOrder] = useState([]);
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  function handleFilterPriorityChange(e) {
    setFilterPriority(e.target.value);
  }  
  
  function handleFilterStatusChange(e) {
    setFilterStatus(e.target.value);
  }  


  useEffect(() => {
    axios
      .get("http://localhost:8070/order/")
      .then((response) => {
        setOrder(response.data);
      }) 
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8070/order/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        setOrder(order.filter((order) => order._id !== id));
        alert("Order Deleted")
      })
      .catch((error) => {
        console.log(error);
      });};

  return (
    <center>
      <div>
    <div className="main-div">
      <h2>All Order</h2>
      <button className="btn btn-warning btn-create"><a href="/addOrder">Create New Order</a></button>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Doctor ID</th>
            <th>Patient ID</th>
            <th>Test Type</th>
            <th>
              Priority
              <select className="form-select" onChange={handleFilterPriorityChange} value={filterPriority}>
                <option value="">All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </th>
            <th>Status
            <select className="form-select" onChange={handleFilterStatusChange} value={filterStatus}>
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Assign">Assign</option>
                <option value="Completed">Completed</option>
              </select>
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {order 
          .filter((order) =>
            filterPriority === "" ? true : order.priority === filterPriority
          )
          .filter((order) =>
            filterStatus === "" ? true : order.status === filterStatus
          )
          .map((order) => (
            <tr key={order._id}>
              <td>{order.order_id}</td>
              <td>{order.doctor_id}</td>
              <td>{order.patient_id}</td>
              <td>{order.testtype}</td>
              <td>{order.priority}</td>
              <td>{order.status}</td>
              <td>
              <button type="submit" className="btn btn-success"><a href={"/updateOrder/"+order._id}>Edit</a></button>
              <button type="submit" className="btn btn-danger" onClick={() => handleDelete(order._id)}>Delete</button>
              
              {order.reportUrl && (
                <button type="submit" className="btn btn-primary"><a href={"/updateResult/"+order.order_id} >View Report</a></button>
              )}
              {!order.reportUrl && (
                <button type="submit" className="btn btn-primary"><a href={"/addResult/" + order._id}>Create Report</a></button>
              )}
              </td>
              
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

export default useViewOrder;
