import React from "react";
import "../css/LoginRoute/LoginRoute.css";
//Importamos el hooks personalizado del login:
import useLogin from "../hooks/useLogin";
//Importamos el Loader:
import Loader from "../components/accesories/Loader";
//Initial State:
const initialState = {
  mail: "",
  password: "",
};

const LoginRoute = () => {
  //destructuramos las variables y funciones que nos brinda:
  const { form, error, loginLoading, handleChange, handleSubmitLogin } =
    useLogin(initialState);

  return (
    <div className="loginRoute">
      <h1>Login</h1>

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
