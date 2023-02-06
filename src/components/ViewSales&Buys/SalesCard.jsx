import React, { useState, useEffect } from "react";
import "../../css/viewSales&Buys/SalesCard.css";
import TYPES_USERSALES from "../../reducers/types/userSalesTypes";
const SalesCard = ({ sale, dispatch, user }) => {
  const [rated, setRated] = useState(false);

  /**  -------- USE EFFECT --------  **/
  useEffect(() => {
    if (sale.user_reputations.length !== 0) {
      const check = sale.user_reputations.filter((s) => s.ur_rol === "buyer");
      if (check.length !== 0) {
        setRated(true);
      } else {
        setRated(false);
      }
    } else {
      setRated(false);
    }
  }, [sale]);

  /**  HANDLE CLICK RATE **/
  const handleRate = (e) => {
    e.preventDefault();
    dispatch({
      type: TYPES_USERSALES.setForm,
      payload: {
        qualifier: user.user_id,
        receiver: sale.buyer.user_id,
        sale: sale.sale_id,
        rol: "buyer",
        rs_id: "",
        description: "",
      },
    });
    dispatch({ type: TYPES_USERSALES.setModal });
  };

  return (
    <>
      <article className="salesCard">
        <div className="salesCard-buyer">
          <p className="salesCard-p">
            <b className="salesCard-b">Buyer: </b>
            {sale.buyer.user_username}
          </p>
          <p className="salesCard-p">
            <b className="salesCard-b">Mail: </b>
            {sale.buyer.user_mail}
          </p>
        </div>

        <div className="salesCard-product">
          <p className="salesCard-p">
            <b className="salesCard-b">Product:</b>
            {sale.sale_products[0].product.product_name}
          </p>
          <p className="salesCard-p">
            <b className="salesCard-b">Units:</b>
            {sale.sale_products[0].sp_quantity}
          </p>
        </div>

        <div className="salesCard-amount">
          <p className="salesCard-p">
            <b className="salesCard-b">Amount: $</b>
            {sale.sale_amount}
          </p>
          <p className="salesCard-p">
            <b className="salesCard-b">Instalments: </b>
            {sale.sale_instalments}
          </p>
        </div>

        <div className="salesCard-rate">
          {rated ? (
            <p className="salesCard-p">You've already rated the buyer.</p>
          ) : (
            <button className="button-grayBlue" onClick={(e) => handleRate(e)}>
              Rate buyer
            </button>
          )}
        </div>
        <hr className="saleCard-hr" />
      </article>
    </>
  );
};

export default SalesCard;
