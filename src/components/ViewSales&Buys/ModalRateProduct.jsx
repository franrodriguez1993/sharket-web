import React, { useEffect } from "react";
import "../../css/viewSales&Buys/ModalRate.css";
//Fetch:
import { URL_API } from "../../utils/URL";
import ManageFetch from "../../utils/manageFetch";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import TYPES_USERSALES from "../../reducers/types/userSalesTypes";

const ModalRateProduct = ({
  dispatch,
  scores,
  formProduct,
  handleRateProduct,
  errorModalProduct,
}) => {
  const { FetchFunction } = ManageFetch();

  /** ----  USE EFFECT  ---- **/

  useEffect(() => {
    const url = `${URL_API}/score/list`;
    dispatch({ type: TYPES_USERSALES.setLoading });
    FetchFunction({ url }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: TYPES_USERSALES.setScores, payload: res.data });
      }
    });
  }, []);

  /** HANDLE CLOSE MODAL **/

  const handleClose = (e) => {
    e.preventDefault();
    dispatch({ type: TYPES_USERSALES.setCloseModalProduct });
  };

  return (
    <section className="modal-container">
      <form className="modalRate-form">
        <h3 className="title">Rate Product</h3>
        {errorModalProduct && <p className="text-error">{errorModalProduct}</p>}
        <label htmlFor="rs_id" className="modalRate-label">
          How do you describe the Product?
        </label>
        <select
          name="rs_id"
          id="rs_id"
          className="modalRate-input"
          onChange={(e) =>
            dispatch({
              type: TYPES_USERSALES.setHandleChangeProduct,
              payload: e.target,
            })
          }
          value={formProduct.rs_id || ""}
        >
          <option value="">---</option>
          {scores.length !== 0 && (
            <>
              {scores.map((s) => (
                <option key={s.rs_id} value={s.rs_id}>
                  {s.rs_name}
                </option>
              ))}
            </>
          )}
        </select>
        <label htmlFor="description" className="modalRate-label">
          Description:
        </label>
        <textarea
          name="description"
          id="description"
          className="modalRate-textarea"
          onChange={(e) =>
            dispatch({
              type: TYPES_USERSALES.setHandleChangeProduct,
              payload: e.target,
            })
          }
          value={formProduct.description || ""}
        ></textarea>

        <button className="button-success" onClick={handleRateProduct}>
          Send
        </button>
        <button className="button-warn" onClick={(e) => handleClose(e)}>
          Cancel
        </button>
      </form>
    </section>
  );
};

export default React.memo(ModalRateProduct);
