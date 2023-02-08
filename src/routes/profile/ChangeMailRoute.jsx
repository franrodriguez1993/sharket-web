import React, { useContext } from "react";
import SectionLoader from "../../components/accesories/SectionLoader";
import useProfile from "../../hooks/useProfile";
import { UserContext } from "../../context/UserProvider";
const ChangeMailRoute = () => {
  const { user, logIn, token } = useContext(UserContext);
  const { errorsForm, errorFetch, loading, HCMail, mailForm, HSMail } =
    useProfile(user, token, logIn);

  return (
    <div className="routeContainer">
      <h1 className="title">Modify mail</h1>

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
      <form className="form-container" onSubmit={HSMail}>
        <p>
          <b>Current mail: </b>
          {user.user_mail}
        </p>
        <label htmlFor="mail" className="form_label">
          New mail:
        </label>
        <input
          type="mail"
          name="mail"
          id="mail"
          className={`form_input ${errorsForm.mail && "form_input-error"}`}
          onChange={HCMail}
          value={mailForm.mail || ""}
        />
        {errorsForm.mail && (
          <p className="form_input-error--p">{errorsForm.mail}</p>
        )}

        <button className="button-blue">Submit</button>
      </form>
    </div>
  );
};

export default ChangeMailRoute;
