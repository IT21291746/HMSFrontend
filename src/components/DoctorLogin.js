import React, { useState ,useEffect} from "react";
import axios from "axios";

function DoctorLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/doctor/")
      .then((response) => {
        setDoctor(response.data);
      }) 
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }; 

  const handleSubmit = (event) => {
    event.preventDefault();
    const loggedInUser = doctor.find((e) => e.doctor_id === username && e.password === password && e._id && e.name);
    if (loggedInUser) {
      // Log the user in
      localStorage.setItem("loggedInUser", JSON.stringify({ loggedInUser }));
      console.log("Logged in!");
      window.location.href="/doctorHome";
    } else {
      // Display an error message
      alert("Invalid username or password");
      
    }
  };

  return (
    <section>
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-12 col-sm-8 col-md-6 m-auto">
          <div className="card border-0 shadow">
            <div className="card-body">
              <center>
              <svg className="mx-auto my-3" xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
              </svg>
              </center>
              <div className="text-center mt-3">
                <h4>Doctor Management System</h4><br/><h3>Vadakachchi Hospital</h3>
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control my-4 py-2"
                  type="text"
                  id="username"
                  value={username}
                  required
                  placeholder="Username"
                  onChange={handleUsernameChange}
                />       
              
                <input
                  type="password"
                  id="password"
                  className="form-control my-4 py-2"
                  value={password}
                  required
                  placeholder="Password"
                  onChange={handlePasswordChange}
                />
                <div className="text-center mt-3">
                  
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
              </form>
      </div>
      </div>
      </div>
      </div>
    </div>
    </section>
  );
}

export default DoctorLogin;
