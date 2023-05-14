import React,{useState , useEffect} from "react";
import axios from "axios"

export default function AddMedicine(){

    const [medicine_id, setMedicineID] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [dosage, setDosage] = useState("");
    const [quantity, setQuantity] = useState(0);
    useEffect(() => {
      generateEmployeeId();
    }, []);
  
    function generateEmployeeId() {
      axios
        .post("http://localhost:8070/medicine/maxId")
        .then((response) => {
          const maxId = response.data.maxId;
          const newId = "MED" + (parseInt(maxId.substring(3)) + 1);
          setMedicineID(newId);
        })
        .catch((err) => {
          alert(err);
        });
    }





function sendData(e){
    e.preventDefault();
    
    const newMedicine = {
        medicine_id,
        name,
        price,
        dosage,
        quantity,
    }

    axios.post("http://localhost:8070/medicine/add", newMedicine).then(()=>{
        alert("Medicine Added")

        setMedicineID("");
        setName("");
        setDosage("");
        setQuantity("");
        setPrice("");



    }).catch((err)=>{
        alert(err)
    })
}

    return(
        <div className="main-div">
          <h2>Add New Medicines</h2>
          <form onSubmit={sendData}> 
            <div className="mb-3">
              <label for="medicineId" className="form-label">Medicine ID</label>
              <input type="text" className="form-control" id="medicineId" value={medicine_id} readOnly></input>
            </div>

            <div className="mb-3">
              <label for="name" className="form-label">Medicine Name</label>
              <input type="text" className="form-control" id="name" onChange={(e)=>{setName(e.target.value);}}></input>
            </div>

            <div className="mb-3">
              <label for="quantity" className="form-label">Quantity</label>
              <input type="text" className="form-control" id="quantity" onChange={(e)=>{setQuantity(e.target.value);}}></input>
            </div>

            <div className="mb-3">
              <label for="dosage" className="form-label">Dosage of Medicine</label>
              <input type="number" className="form-control" id="dosage" onChange={(e)=>{setDosage(e.target.value);}}></input>
            </div>

            <div className="mb-3">
              <label for="price" className="form-label">Price</label>
              <input type="text" className="form-control" id="price" onChange={(e)=>{setPrice(e.target.value);}}></input>
            </div>
              
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
    )
}



