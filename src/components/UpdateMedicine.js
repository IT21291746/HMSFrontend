import React, { useState,useEffect } from "react";
import axios from "axios";
import{useParams} from 'react-router-dom';

function UpdateMedicine() {
  const {id} = useParams();
  const [medicine, setMedicine] = useState([]);
  const [medicine_id, setMedicineId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [dosage, setDosage] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(()=>{
    axios.post(`http://localhost:8070/medicine/findOne/${id}`).then((res)=> {
      setMedicine(res.data);
    }).catch((err)=>{
      console.log(err);
      alert("Error with retriving data");
    });
  },[id]);


function handleUpdate(e){
  const UpdatedMedicine = {
      medicine_id,
      name,
      price,
      dosage,
      quantity,
    };
    axios
      .put(`http://localhost:8070/medicine/update/`+id,UpdatedMedicine)
      .then((response) => {
        console.log(response.data);
        alert("Medicine Updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main-div">
    <div className="container pt-1">
      
      <div className="row">
        <div className="col-12 col-sm-08  col-md-8 m-auto">
          <div className="card border-0 shadow">
          <div className="card-body">
          <center>  
          <h2>Update Medicine Details</h2>
          </center>
        <form onSubmit={handleUpdate}>

          <div className="mt-3 mb-3">
          <label className="form-label">Medicine ID:</label>
          <input type="text" className="form-control" placeholder={medicine.medicine_id} onChange={(e) => setMedicineId(e.target.value)} />
          </div>

          <div className="mb-3">
          <label className="form-label">Name:</label>
          <input type="text" className="form-control" placeholder={medicine.name} onChange={(e) => setName(e.target.value)} />
          
          </div>
          
          <div className="mb-3">
          <label className="form-label">Price:</label>
          <input type="number" className="form-control" placeholder={medicine.price} onChange={(e) => setPrice(e.target.value)}/>
          </div>
          
          <div className="mb-3">
          <label className="form-label">Dosage:</label>
          <input type="text" className="form-control" placeholder={medicine.dosage} onChange={(e) => setDosage(e.target.value)} />
          </div>
          
          <div className="mb-3">
          <label className="form-label">Quantity:</label>
          <input type="number" className="form-control" placeholder={medicine.quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>
          <button  className="btn btn-info mt-3 mb-3" type="submit">Update Medicine</button>
        </form>
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default UpdateMedicine;
