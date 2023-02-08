import React, { useContext } from "react";
import useProfile from "../../hooks/useProfile";
import { UserContext } from "../../context/UserProvider";
import SectionLoader from "../../components/accesories/SectionLoader";

const PasswordRoute = () => {
  const { user, logIn, token } = useContext(UserContext);
  const {
    loading,
    errorsForm,
    errorFetch,
    passwordForm,
    HCPassword,
    HSPassword,
  } = useProfile(user, token, logIn);
  return (
    <div className="routeContainer">
      <h1 className="title">Update password</h1>

      {/**  ERROR FETCH   **/}
      {errorFetch && (
        <div className="alert-error-container">
          <p className="text-error">{errorFetch}</p>
        </div>
      )}

      {/**  LOADING  **/}
      {loading && (
        <div className="modal-container">
          <SectionLoader />
        </div>
      )}

      <form className="form-container" onSubmit={HSPassword}>
        {/**  PASSWORD   **/}
        <label htmlFor="password" className="form_label">
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className={`form_input ${errorsForm.password && "form_input-error"}`}
          onChange={HCPassword}
          value={passwordForm.password || ""}
        />

        {errorsForm.password && (
          <p className="form_input-error--p">{errorsForm.password}</p>
        )}

        {/**  REPASSWORD   **/}
        <label htmlFor="repassword" className="form_label">
          Confirm password:
        </label>
        <input
          type="password"
          name="repassword"
          id="repassword"
          className={`form_input ${
            errorsForm.repassword && "form_input-error"
          }`}
          onChange={HCPassword}
          value={passwordForm.repassword || ""}
        />

        {errorsForm.repassword && (
          <p className="form_input-error--p">{errorsForm.repassword}</p>
        )}

        <button className="button-blue">Submit</button>
      </form>
    </div>
  );
};

export default PasswordRoute;
