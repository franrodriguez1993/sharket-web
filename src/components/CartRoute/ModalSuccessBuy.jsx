import React from "react";
import { useNavigate } from "react-router-dom";
import TYPES_CART from "../../reducers/types/cartTypes";
import successIcon from "../../svg/success.svg";
const ModalSuccessBuy = ({ dispatch }) => {
  const navigate = useNavigate();
  return (
    <div className="modal-container">
      <div className="modalbuy">
        <img src={successIcon} alt="" className="modalbuy-icon" />
        <b>Buy completed successfully</b>
        <button
          className="button-blue mt-3"
          onClick={() => {
            dispatch({ type: TYPES_CART.resetModals });
            navigate("/products/user/buys");
          }}
        >
          See your buys
        </button>
      </div>
    </div>
  );
};

export default ModalSuccessBuy;
