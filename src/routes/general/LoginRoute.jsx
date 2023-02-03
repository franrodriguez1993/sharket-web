import React, { useContext, useEffect } from "react";
import "../../css/LoginRoute/LoginRoute.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
//Hook:
import useLogin from "../../hooks/useLogin";
//Components:
import Loader from "../../components/accesories/Loader";

const initialState = {
  mail: "",
  password: "",
};

const LoginRoute = () => {
  const { form, error, loginLoading, handleChange, handleSubmitLogin } =
    useLogin(initialState);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) return navigate("/");
  }, [user]);

  return (
    <div className="loginRoute-container">
      <h1 className="loginRoute-title">Login</h1>

      {/* Formulario de Login  */}
      <form className="form-login" onSubmit={handleSubmitLogin}>
        <label htmlFor="mail">mail</label>
        <input
          type="mail"
          id="mail"
          name="mail"
          onChange={handleChange}
          value={form.mail || ""}
        />

        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={form.password || ""}
        />

        <button> Submit</button>
      </form>
      {/**  --------       LOADING:        -------  **/}
      {loginLoading && <Loader />}

      {/**  --------       MENSAJE DE ERROR:        -------  **/}
      {error && <p className="error-login">{error}</p>}
    </div>
  );
};

export default LoginRoute;
