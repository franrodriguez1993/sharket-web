import React from "react";
import { useNavigate } from "react-router-dom";
import TYPES_CART from "../../reducers/types/cartTypes";
import errorIcon from "../../svg/error.svg";

const ModalErrorBuy = ({ dispatch }) => {
  const navigate = useNavigate();
  return (
    <div className="modal-container">
      <div className="modalbuy">
        <img src={errorIcon} alt="" className="modalbuy-icon" />
        <b>An error happened</b>
        <button
          className="button-warn mt-3"
          onClick={() => {
            dispatch({ type: TYPES_CART.resetModals });
            navigate("/");
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ModalErrorBuy;
