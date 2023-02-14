import React from "react";
import successIcon from "../../svg/success.svg";
const ModalAddedCart = () => {
  return (
    <div className="modal-container">
      <div className="modalbuy">
        <img src={successIcon} alt="" className="modalbuy-icon" />
        <b>Product added to cart</b>
      </div>
    </div>
  );
};

export default ModalAddedCart;
