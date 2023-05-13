import React,{useState , useEffect} from "react";
import axios from "axios"

export default function AddDoctor(){

    const [doctor_id, setDoctorID] = useState("");
    const [name, setName] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");
    const [contact_number, setContactNumber] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
      generateDoctorId();
    }, []);
  
    function generateDoctorId() {
      axios
        .post("http://localhost:8070/doctor/maxId")
        .then((response) => {
          const maxId = response.data.maxId;
          const newId = "DOC" + (parseInt(maxId.substring(3)) + 1);
          setDoctorID(newId);
        })
        .catch((err) => {
          alert(err);
        });
    }
  


function sendData(e){
    e.preventDefault();
    
    const newDoctor = {
        doctor_id,
        name,
        specialization,
        age,
        gender,
        contact_number,
        password
    }
 
    axios.post("http://localhost:8070/doctor/add", newDoctor).then(()=>{
        alert("Doctor Added")

        setDoctorID("");
        setName("");
        setAge("");
        setGender("");
        setContactNumber("");
        setSpecialization("");
        setPassword("");


    }).catch((err)=>{
        alert(err)
    })
}

    return(
        <div className="main-div">
          <div className="container">
            <div className="row">
            <div className="col-12 col-sm-8 col-md-8 m-auto">
          <h2>Create New Doctor Profile</h2>
          <form onSubmit={sendData}> 
            <div className="mb-3">
              <label for="doctorId" className="form-label">Doctor ID</label>
              <input type="text" className="form-control" id="doctorId" value={doctor_id} readOnly></input>
            </div>

            <div className="mb-3">
              <label for="name" className="form-label">Doctor Name</label>
              <input type="text" className="form-control" id="name" onChange={(e)=>{setName(e.target.value);}}></input>
            </div>

            <div className="mb-3">
            <label className="form-label">Gender:</label>
            <select className="form-control" id="gender" onChange={(e) => setGender(e.target.value)}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            </div>
            <div className="mb-3">
              <label for="age" className="form-label">Age</label>
              <input type="number" className="form-control" id="age" onChange={(e)=>{setAge(e.target.value);}}></input>
            </div>

            <div className="mb-3">
              <label for="specialization" className="form-label">Dotor's specialization</label>
              <input type="text" className="form-control" id="specialization" onChange={(e)=>{setSpecialization(e.target.value);}}></input>
            </div>

            <div className="mb-3">
              <label for="contactNumber" className="form-label">Mobile Number</label>
              <input type="text" className="form-control" id="contactNumber" onChange={(e)=>{setContactNumber(e.target.value);}}></input>    
            </div>

            <div className="mb-3">
              <label for="password" className="form-label">Password</label>
              <input type="text" className="form-control" id="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" onChange={(e)=>{setPassword(e.target.value);}}></input>    
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          </div>
          </div> 
          </div> 
        </div>
    )
}



