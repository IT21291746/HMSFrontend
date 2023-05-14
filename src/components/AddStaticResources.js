import React,{useState , useEffect} from "react";
import axios from "axios"

export default function AddStaticResources(){

    const [srid, setSRID] = useState("");
    const [name, setName] = useState("");
    const [availablenumber, setAvailableNumber] = useState();
    

    useEffect(() => {
      generateId();
    }, []);
    
    function generateId() {
      axios
        .post("http://localhost:8070/staticresources/maxId")
        .then((response) => {
          const maxId = response.data.maxId;
          const newId = "SRID_" + (parseInt(maxId.substring(5)) + 1);
          setSRID(newId);
        })
        .catch((err) => {
          alert(err);
        });
    }
    

function sendData(e){
    e.preventDefault();
    
    const newStaticResources = {
        srid,
        name,
        availablenumber,
    }

    axios.post("http://localhost:8070/staticresources/add", newStaticResources).then(()=>{
        alert("StaticResources Added")
        window.location.href='/viewAllResources';

        setSRID("");
        setName("");
        setAvailableNumber(0);

    }).catch((err)=>{
        alert(err)
    })
}

    return(
        <div className="main-div">
          <div className="container">
            <div className="row">
            <div className="col-12 col-sm-8 col-md-8 m-auto">
          <h2>Add New StaticResources</h2>
          <form onSubmit={sendData}> 

            <div className="mb-3">
              <label for="srid" className="form-label">StaticResources ID</label>
              <input type="text" className="form-control" id="srid" value={srid} readOnly></input>
            </div>

            <div className="mb-3">
              <label for="name" className="form-label">StaticResources Name</label>
              <input type="text" className="form-control" id="name" onChange={(e)=>{setName(e.target.value);}}></input>
            </div>


            {/* <div className="mb-3">
              <label for="availablenumber" className="form-label">Available Number</label>
              <input type="number" className="form-control" id="availablenumber" onChange={(e)=>{setAvailableNumber(e.target.value);}}></input>
            </div> */}
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          </div>
          </div> 
          </div> 
        </div>
    )
}



