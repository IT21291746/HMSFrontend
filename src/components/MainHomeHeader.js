import React  from "react";
import { Route ,Routes} from "react-router-dom";

 function MainHomeHeader(){
     return(
        <center>
        <nav class="navbar bg-body-tertiary bg-primary">
            <div class="container-fluid">
            <a class="navbar-brand" href="/">
            <img src="/images/heartbeat.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top"/>
                Vadakachchi Hospital Management System
            </a>

            {/* <ul class="nav justify-content-center">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Active</a>
            </li>
            
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
  
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
     
            <li class="nav-item">
                <a class="nav-link">Sign Out</a>
            </li>
      
        </ul> */}

            </div>
        </nav>

       </center>
     ) 
 }
export default MainHomeHeader;