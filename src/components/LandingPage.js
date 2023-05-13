import React from "react";
import { Link } from "react-router-dom";

function LandingPage(){

    return( 
        <div className="overlay">
            <div className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#hamburger">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>

                        <a href="#" className="navbar-brand"><i className="fas fa-camera"></i>CPTR</a>

                    </div>

                    <div className="collapse navbar-collapse" id="hamburger">
                        <ul className="nav navbar-nav">
                            <li><a href="#"></a>Home</li>
                            <li><a href="#"></a>About</li>
                            <li><a href="#"></a>Conatact Us</li>
                        </ul>

                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#"><i className="fas fa-user-plus"></i>Sign Up</a></li>
                            <li><a href="#"><i className="fas fa-user-plus"></i>Login</a></li>
                        </ul>

                    </div>

                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div id="content">
                                <h1 className="landing-page-h1">Capture Every Moment</h1>
                                <h3 className="landing-page-h3">ccscdvvvdwbsfgbsdcvawrgqefbadfvadfvbbebebebebeb</h3>
                                <button className="btn btn-default btn-lg"><i className="fas fa-image"></i></button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}


export default LandingPage;