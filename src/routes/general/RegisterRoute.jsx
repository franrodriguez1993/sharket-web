import React from "react";
import "../../css/RegisterRoute/RegisterRoute.css";
import useRegister from "../../hooks/useRegister";
import SectionLoader from "../../components/accesories/SectionLoader";
const RegisterRoute = () => {
  const {
    form,
    loading,
    errors,
    errorFetch,
    handleChange,
    handleSubmit,
    successMsg,
  } = useRegister();

  return (
    <div className="routeContainer">
      <h1 className="title">Register</h1>

      {successMsg && (
        <div className="alert-success-container">
          <h3 className="text-alert-success">{successMsg}</h3>
        </div>
      )}

      {errorFetch && (
        <div className="alert-error-container">
          <h3 className="text-error">{errorFetch}</h3>
        </div>
      )}
      <form className="form-register" onSubmit={handleSubmit}>
        {/** USERNAME   **/}
        <label htmlFor="username" className="form_label">
          Username
        </label>
        <input
          type="text"
          className={`form_input ${errors.username && "form_input-error "}`}
          id="username"
          name="username"
          onChange={handleChange}
          value={form.username || ""}
        />

        {errors.username && (
          <p className="form_input-error--p">{errors.username}</p>
        )}

        {/** MAIL   **/}
        <label htmlFor="mail" className="form_label">
          Mail
        </label>
        <input
          type="mail"
          className={`form_input ${errors.mail && "form_input-error "}`}
          id="mail"
          name="mail"
          onChange={handleChange}
          value={form.mail || ""}
        />

        {errors.mail && <p className="form_input-error--p">{errors.mail}</p>}

        {/** PASSWORD   **/}
        <label htmlFor="password" className="form_label">
          Password
        </label>
        <input
          type="password"
          className={`form_input ${errors.password && "form_input-error "}`}
          id="password"
          name="password"
          onChange={handleChange}
          value={form.password || ""}
        />

        {errors.password && (
          <p className="form_input-error--p">{errors.password}</p>
        )}

        {/** REPASSWORD   **/}
        <label htmlFor="repassword" className="form_label">
          Confirm password:
        </label>
        <input
          type="repassword"
          className={`form_input ${errors.repassword && "form_input-error "}`}
          id="repassword"
          name="repassword"
          onChange={handleChange}
          value={form.repassword || ""}
        />

        {errors.repassword && (
          <p className="form_input-error--p">{errors.repassword}</p>
        )}

        <button className="button-blue">Submit</button>
      </form>

      {/** MODAL LOADING **/}
      {loading && (
        <section className="modal-container">
          <SectionLoader />
        </section>
      )}
    </div>
  );
};

export default RegisterRoute;
