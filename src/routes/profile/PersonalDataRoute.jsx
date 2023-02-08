import React, { useContext } from "react";
import useProfile from "../../hooks/useProfile";
import SectionLoader from "../../components/accesories/SectionLoader";
import { UserContext } from "../../context/UserProvider";

const PersonalDataRoute = () => {
  const { user, token, logIn } = useContext(UserContext);
  const {
    loading,
    errorsForm,
    errorFetch,
    personalForm,
    HCPersonalForm,
    HSPersonalForm,
  } = useProfile(user, token, logIn);

  return (
    <div className="routeContainer">
      <h1 className="title">Update personal data</h1>

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
      <form className="form-container" onSubmit={HSPersonalForm}>
        {/**  USERNAME   **/}
        <label htmlFor="username" className="form_label">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className={`form_input ${errorsForm.username && "form_input-error"}`}
          onChange={HCPersonalForm}
          value={personalForm.username || ""}
        />
        {errorsForm.username && (
          <p className="form_input-error--p">{errorsForm.username}</p>
        )}

        {/**  NAME   **/}
        <label htmlFor="name" className="form_label">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={`form_input ${errorsForm.name && "form_input-error"}`}
          onChange={HCPersonalForm}
          value={personalForm.name || ""}
        />
        {errorsForm.name && (
          <p className="form_input-error--p">{errorsForm.name}</p>
        )}

        {/**  LASTNAME   **/}
        <label htmlFor="lastname" className="form_label">
          Lastname:
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          className={`form_input ${errorsForm.lastname && "form_input-error"}`}
          onChange={HCPersonalForm}
          value={personalForm.lastname || ""}
        />
        {errorsForm.lastname && (
          <p className="form_input-error--p">{errorsForm.lastname}</p>
        )}

        {/**  DNI   **/}
        <label htmlFor="dni" className="form_label">
          DNI:
        </label>
        <input
          type="number"
          id="dni"
          name="dni"
          className={`form_input ${errorsForm.dni && "form_input-error"}`}
          onChange={HCPersonalForm}
          value={personalForm.dni || ""}
        />
        {errorsForm.dni && (
          <p className="form_input-error--p">{errorsForm.dni}</p>
        )}

        {/**  PHONE   **/}
        <label htmlFor="phone" className="form_label">
          Phone:
        </label>
        <input
          type="number"
          id="phone"
          name="phone"
          className={`form_input ${errorsForm.phone && "form_input-error"}`}
          onChange={HCPersonalForm}
          value={personalForm.phone || ""}
        />
        {errorsForm.phone && (
          <p className="form_input-error--p">{errorsForm.phone}</p>
        )}

        <button className="button-blue">Submit</button>
      </form>
    </div>
  );
};

export default PersonalDataRoute;
