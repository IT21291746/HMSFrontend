import React,{useState , useEffect} from "react";
import axios from "axios"

export default function AddEmployee(){

    const [employee_id, setEmployeeId] = useState()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [sex, setSex] = useState("");
    const [age, setAge] = useState(0);
    const [address, setAddress] = useState("");
    const [contact_number, setContactNumber] = useState("");

 

    useEffect(() => {
      generateEmployeeId();
    }, []);
  
    function generateEmployeeId() {
      axios
        .post("http://localhost:8070/employee/maxId")
        .then((response) => {
          const maxId = response.data.maxId;
          const newId = "LK" + (parseInt(maxId.substring(2)) + 1);
          setEmployeeId(newId);
        })
        .catch((err) => {
          alert(err);
        });
    }




function sendData(e){
    e.preventDefault();
    
    const newEmployee = {
        employee_id,
        name,
        email,
        password,
        sex,
        age,
        address,
        contact_number
    }

    axios.post("http://localhost:8070/employee/add", newEmployee).then(()=>{
        alert("Employee Added")
        window.location.href='/viewEmployee'

        setEmployeeId(0);
        setName("");
        setEmail("");
        setPassword("");
        setAge();
        setAddress("");
        setContactNumber("");
        setSex("");
        



    }).catch((err)=>{
        alert(err)
    })
}

    return(
        <div className="main-div">
          <div className="container pt-1">
      
      <div className="row">
        <div className="col-12 col-sm-08  col-md-9 m-auto">
          <div className="card border-0 shadow">
          <div className="card-body">
          <center>  
          <h2>Create New Lab Employee</h2>
          </center>
          <form onSubmit={sendData}> 
            <div className="mb-3">
              <label for="employeeId" className="form-label">Employee ID</label>
              <input type="text" className="form-control" id="employeeId" value={employee_id} readOnly></input>
            </div>

            <div className="mb-3">
              <label for="name" className="form-label">Employee Name</label>
              <input type="text" className="form-control" id="name" required onChange={(e)=>{setName(e.target.value);}}></input>
            </div>

            <div className="mb-3">
              <label for="email" className="form-label">Employee Email</label>
              <input type="email" className="form-control" id="email" required onChange={(e)=>{setEmail(e.target.value);}}></input>
            </div>

            <div className="mb-3">
              <label for="password" className="form-label">Employee Password</label>
              <input type="password" className="form-control" id="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required onChange={(e)=>{setPassword(e.target.value);}}></input>
            </div>

            <div className="mb-3">
              <label for="sex" className="form-label">Gender</label>
            <select className="form-control" id="sex" onChange={(e)=>{setSex(e.target.value);}} required >
            <option>Select Your Gender</option>
              <option value="Male" onChange={(e)=>{setSex(e.target.value);}}>Male</option>
              <option value="Female" onChange={(e)=>{setSex(e.target.value);}}>Female</option>
            </select>

            </div>

            <div className="mb-3">
              <label for="age" className="form-label">Age</label>
              <input type="number" className="form-control" id="age" required onChange={(e)=>{setAge(e.target.value);}}></input>
            </div>

            <div className="mb-3">
              <label for="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" required onChange={(e)=>{setAddress(e.target.value);}}></input>
            </div>

            <div className="mb-3">
              <label for="contactNumber" className="form-label">Mobile Number</label>
              <input type="text" className="form-control" id="contactNumber" required onChange={(e)=>{setContactNumber(e.target.value);}}></input>    
            </div>
              
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}



