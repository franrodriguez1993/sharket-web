import React, { useContext } from "react";
import useProfile from "../../hooks/useProfile";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../context/UserProvider";
import SectionLoader from "../../components/accesories/SectionLoader";

const BirthdayRoute = () => {
  const { user, token, logIn } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    errorFetch,
    errorsForm,
    loading,
    birthdayForm,
    HCBirthday,
    HSBirthday,
  } = useProfile(user, token, logIn);
  return (
    <div className="routeContainer">
      <h1 className="title"> Set your birthday</h1>

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

      {user.user_birthday ? (
        <>
          <div className="alert-error-container">
            <p className="text-error">
              You have already set your birthday. You can't change it.
            </p>
          </div>
          <button className="button-blue" onClick={() => navigate("/profile")}>
            Back
          </button>
        </>
      ) : (
        <form className="form-container" onSubmit={HSBirthday}>
          {/**  DAY   **/}
          <label htmlFor="day" className="form_label">
            Day:
          </label>
          <input
            type="number"
            min={1}
            max={31}
            name="day"
            id="day"
            className={`form_input ${errorsForm.day && "form_input-error"}`}
            onChange={HCBirthday}
            value={birthdayForm.day || ""}
          />

          {errorsForm.day && (
            <p className="form_input-error--p">{errorsForm.day}</p>
          )}

          {/**  MONTH   **/}
          <label htmlFor="month" className="form_label">
            Month:
          </label>
          <input
            type="number"
            min={1}
            max={12}
            name="month"
            id="month"
            className={`form_input ${errorsForm.month && "form_input-error"}`}
            onChange={HCBirthday}
            value={birthdayForm.month || ""}
          />

          {errorsForm.month && (
            <p className="form_input-error--p">{errorsForm.month}</p>
          )}

          {/**  YEAR   **/}
          <label htmlFor="year" className="form_label">
            Year:
          </label>
          <input
            type="number"
            min={1940}
            max={2022}
            name="year"
            id="year"
            className={`form_input ${errorsForm.year && "form_input-error"}`}
            onChange={HCBirthday}
            value={birthdayForm.year || ""}
          />

          {errorsForm.year && (
            <p className="form_input-error--p">{errorsForm.year}</p>
          )}

          <button className="button-blue">Submit</button>
        </form>
      )}
    </div>
  );
};

export default BirthdayRoute;
