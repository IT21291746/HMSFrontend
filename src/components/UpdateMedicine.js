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
    <center>
      <h2>Update Medicine</h2>
      <div>
        <form onSubmit={handleUpdate}>
          <label>Medicine ID:</label>
          <input type="text" placeholder={medicine.medicine_id} onChange={(e) => setMedicineId(e.target.value)} />
          <br />
          <br />
          <label>Name:</label>
          <input type="text" placeholder={medicine.name} onChange={(e) => setName(e.target.value)} />
          <br />
          <br />
          <label>Price:</label>
          <input
            type="number"
            placeholder={medicine.price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          <label>Dosage:</label>
          <input type="text" placeholder={medicine.dosage} onChange={(e) => setDosage(e.target.value)} />
          <br />
          <br />
          <label>Quantity:</label>
          <input type="number" placeholder={medicine.quantity} onChange={(e) => setQuantity(e.target.value)} />
          <br />
          <br />
          <br />
          <br />
          <button type="submit">Update Medicine</button>
        </form>
      </div>
    </center>
    </div>
  );
}

export default UpdateMedicine;
