import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";

 function ResourceHeader(){

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

  function handleLogout() {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
    localStorage.removeItem("loggedInUser");
    navigate("/");
    }
  }
  
  useEffect(() => {

    const loggedInUsers = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUsers) {
      axios
        .post(`http://localhost:8070/employee/findOne/${loggedInUsers.loggedInUser._id}`)
        .then((response) => {
          console.log("Done")
          setUser(response.data);
        }) 
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

    return(
         <nav>

            
          <div>
         <div>
             <div>
                 <h6 className="main-heading">Vadakachchi Hospital Management System 
                 </h6>
                 <img src="/images/emblem_of_sri_lanka_2.png" alt="img"  className="srilanka-emblem" width={70} height={70}/>
                 <img src="/images/heartbeat.png" alt="img"  className="srilanka-emblem-1" width={90} height={70}/>
             </div>
             <ul className="header-nav-ul">
             <li className="header-nav-li">
                 <a href="/resourceHome">Home</a>
             </li>
             {/* <li className="header-nav-li">
                 <a href="/viewCurrentResources">Resources</a>
            </li> */}
             <li className="header-nav-li">
                 <a href="/resource_order">Manage Orders</a>
             </li>
             <li className="header-nav-li">
                 <a href="/viewAllResources">Manage Resources</a>
             </li>
             <li className="header-nav-li">
                 <a href="/profile">My Profile</a>
             </li>

             <li className="header-nav-li" id="logout-btn">
                 <a onClick={handleLogout} >Log Out</a>
             </li>
         </ul>

     </div>
   </div>

 </nav>

     )
 }


export default ResourceHeader;