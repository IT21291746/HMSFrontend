import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const isLoggedIn = localStorage.getItem("loggedInUser") ? true : false;
  const navigate = useNavigate();
  return (
    <Routes>
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
            
            navigate("/")
        )
      }
    />
    </Routes>
  );
}

export default PrivateRoute;
