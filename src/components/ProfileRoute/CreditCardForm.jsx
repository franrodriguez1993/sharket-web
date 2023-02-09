import React from "react";

const CreditCardForm = ({
  errorsForm,
  creditCardForm,
  HCCreditCard,
  HSCreditCard,
}) => {
  return (
    <form className="form-container" onSubmit={HSCreditCard}>
      <h3 className="fw-bold">Add new credit card</h3>

      {/**  NAME   **/}
      <label htmlFor="cc_name" className="form_label">
        Name:
      </label>
      <input
        type="text"
        name="cc_name"
        id="cc_name"
        className={`form_input ${errorsForm.cc_name && "form_input-error"}`}
        onChange={HCCreditCard}
        value={creditCardForm.cc_name || ""}
      />

      {errorsForm.cc_name && (
        <p className="form_input-error--p">{errorsForm.cc_name}</p>
      )}

      {/**  NUMBER   **/}
      <label htmlFor="cc_number" className="form_label">
        Number:
      </label>
      <input
        type="number"
        name="cc_number"
        id="cc_number"
        className={`form_input ${errorsForm.cc_number && "form_input-error"}`}
        onChange={HCCreditCard}
        value={creditCardForm.cc_number || ""}
      />

      {errorsForm.cc_number && (
        <p className="form_input-error--p">{errorsForm.cc_number}</p>
      )}

      {/**  BANK  **/}
      <label htmlFor="cc_bank" className="form_label">
        Bank:
      </label>
      <input
        type="text"
        name="cc_bank"
        id="cc_bank"
        className={`form_input ${errorsForm.cc_bank && "form_input-error"}`}
        onChange={HCCreditCard}
        value={creditCardForm.cc_bank || ""}
      />

      {errorsForm.cc_bank && (
        <p className="form_input-error--p">{errorsForm.cc_bank}</p>
      )}

      {/**  DATE   **/}
      <div className="d-flex">
        {/**  MONTH   **/}
        <label htmlFor="cc_month" className="form_label">
          Month:
        </label>
        <input
          type="number"
          name="cc_month"
          id="cc_month"
          min={1}
          max={12}
          style={{ width: "3rem" }}
          className={`form_input ${errorsForm.cc_month && "form_input-error"}`}
          onChange={HCCreditCard}
          value={creditCardForm.cc_month || ""}
        />
        {/**  YEAR   **/}
        <label htmlFor="cc_year" className="form_label">
          Year:
        </label>
        <input
          type="number"
          name="cc_year"
          id="cc_year"
          min={2023}
          max={2040}
          style={{ width: "5rem" }}
          className={`form_input ${errorsForm.cc_year && "form_input-error"}`}
          onChange={HCCreditCard}
          value={creditCardForm.cc_year || ""}
        />

        {/**  CODE   **/}
        <label htmlFor="cc_code" className="form_label">
          Code:
        </label>
        <input
          type="number"
          name="cc_code"
          id="cc_code"
          style={{ width: "3rem" }}
          className={`form_input ${errorsForm.cc_code && "form_input-error"}`}
          onChange={HCCreditCard}
          value={creditCardForm.cc_code || ""}
        />
      </div>

      <button className="button-blue">Submit</button>
    </form>
  );
};

export default CreditCardForm;
