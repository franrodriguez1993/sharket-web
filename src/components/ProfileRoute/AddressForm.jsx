import React from "react";

const AddressForm = ({ HCAddress, HSAdress, errorsForm, addressForm }) => {
  return (
    <form className="form-container" onSubmit={HSAdress}>
      <h3 className="fw-bold">Add new address</h3>

      {/**  STREET   **/}
      <label htmlFor="street" className="form_label">
        Street:
      </label>
      <input
        type="text"
        name="street"
        id="street"
        className={`form_input ${errorsForm.street && "form_input-error"}`}
        onChange={HCAddress}
        value={addressForm.street || ""}
      />

      {errorsForm.street && (
        <p className="form_input-error--p">{errorsForm.street}</p>
      )}

      {/**  NUMBER   **/}
      <label htmlFor="number" className="form_label">
        Number:
      </label>
      <input
        type="number"
        name="number"
        id="number"
        className={`form_input ${errorsForm.number && "form_input-error"}`}
        onChange={HCAddress}
        value={addressForm.number || ""}
      />

      {errorsForm.number && (
        <p className="form_input-error--p">{errorsForm.number}</p>
      )}

      {/**  FLOOR   **/}
      <label htmlFor="floor" className="form_label">
        Floor:
      </label>
      <input
        type="number"
        name="floor"
        id="floor"
        className={`form_input ${errorsForm.floor && "form_input-error"}`}
        onChange={HCAddress}
        value={addressForm.floor || ""}
      />

      {errorsForm.floor && (
        <p className="form_input-error--p">{errorsForm.floor}</p>
      )}

      {/**  APARTMENT   **/}
      <label htmlFor="apartment" className="form_label">
        Apartment:
      </label>
      <input
        type="text"
        name="apartment"
        id="apartment"
        className={`form_input ${errorsForm.apartment && "form_input-error"}`}
        onChange={HCAddress}
        value={addressForm.apartment || ""}
      />

      {errorsForm.apartment && (
        <p className="form_input-error--p">{errorsForm.apartment}</p>
      )}

      {/**  CITY   **/}
      <label htmlFor="city" className="form_label">
        City:
      </label>
      <input
        type="text"
        name="city"
        id="city"
        className={`form_input ${errorsForm.city && "form_input-error"}`}
        onChange={HCAddress}
        value={addressForm.city || ""}
      />

      {errorsForm.city && (
        <p className="form_input-error--p">{errorsForm.city}</p>
      )}

      {/**  STATE   **/}
      <label htmlFor="state" className="form_label">
        State:
      </label>
      <input
        type="text"
        name="state"
        id="state"
        className={`form_input ${errorsForm.state && "form_input-error"}`}
        onChange={HCAddress}
        value={addressForm.state || ""}
      />

      {errorsForm.state && (
        <p className="form_input-error--p">{errorsForm.state}</p>
      )}

      <button className="button-blue">Submit</button>
    </form>
  );
};

export default React.memo(AddressForm);
