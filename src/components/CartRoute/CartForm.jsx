import React, { useState } from "react";
import "../../css/CartRoute/CartForm.css";
const CartForm = ({
  form,
  user,
  handleChangeForm,
  handleSubmitBuy,
  errorForm,
}) => {
  const [modal, setModal] = useState(false);

  /**  OPEN MODAL CONFIRM  **/
  const openModalConfirm = (e) => {
    e.preventDefault();
    setModal(true);
  };

  /**  CONFIRM BUY FUNCTION  **/
  const confirmBuy = (e) => {
    e.preventDefault();
    setModal(false);
    handleSubmitBuy();
  };
  return (
    <>
      <form className="cart-form">
        <label htmlFor="creditCard">Select your credit card:</label>
        <select
          name="creditCard"
          id="creditCard"
          className={errorForm && "form_input-error"}
          onChange={handleChangeForm}
          value={form.creditCard || ""}
        >
          <option value="">---</option>
          {user.user_creditCards.map((cc) => (
            <option key={cc.cc_id} value={cc.cc_id}>{`${
              cc.cc_bank
            } - ${cc.cc_number.slice(0, 4)}`}</option>
          ))}
        </select>
        {errorForm && <p className="form_input-error--p">{errorForm}</p>}
        <label htmlFor="instalments">Select the number of instalments: </label>
        <select
          name="instalments"
          id="instalments"
          onChange={handleChangeForm}
          value={form.instalments || 0}
        >
          <option value={0}>0</option>
          <option value={3}>3</option>
          <option value={6}>6</option>
          <option value={12}>12</option>
        </select>
        <button className="button-blue" onClick={openModalConfirm}>
          Buy
        </button>
      </form>

      {/**  MODAL CONFIRM BUY   **/}
      {modal && (
        <section className="modal-container">
          <div className="cartModal">
            <div>
              <b>Confirm buy?</b>
            </div>

            <div>
              <button className="button-blue" onClick={confirmBuy}>
                Confirm
              </button>
              <button className="button-warn" onClick={() => setModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CartForm;
