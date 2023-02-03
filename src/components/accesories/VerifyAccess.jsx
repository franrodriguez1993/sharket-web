import { React, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";

const VerifyAccess = (props) => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  //Si el usuario está logueado, ingresa:
  return props.children;
};

export default VerifyAccess;
