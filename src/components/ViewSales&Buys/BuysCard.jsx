import React, { useState, useEffect } from "react";
import "../../css/viewSales&Buys/SalesCard.css";
import TYPES_USERSALES from "../../reducers/types/userSalesTypes";
const BuysCard = ({ buy, dispatch, user }) => {
  const [rated, setRated] = useState(false);

  /**  -------- USE EFFECT --------  **/
  useEffect(() => {
    if (buy.user_reputations.length !== 0) {
      const check = buy.user_reputations.filter((s) => s.ur_rol === "seller");
      if (check.length !== 0) {
        setRated(true);
      } else {
        setRated(false);
      }
    } else {
      setRated(false);
    }
  }, [buy]);

  /**  HANDLE CLICK RATE **/
  const handleRate = (e) => {
    e.preventDefault();
    dispatch({
      type: TYPES_USERSALES.setForm,
      payload: {
        qualifier: user.user_id,
        receiver: buy.seller.user_id,
        sale: buy.sale_id,
        rol: "seller",
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
            <b className="salesCard-b">Seller: </b>
            {buy.seller.user_username}
          </p>
          <p className="salesCard-p">
            <b className="salesCard-b">Mail: </b>
            {buy.seller.user_mail}
          </p>
        </div>

        <div className="salesCard-product">
          <p className="salesCard-p">
            <b className="salesCard-b">Product: </b>
            {buy.sale_products[0].product.product_name}
          </p>
          <p className="salesCard-p">
            <b className="salesCard-b">Units: </b>
            {buy.sale_products[0].sp_quantity}
          </p>
        </div>

        <div className="salesCard-amount">
          <p className="salesCard-p">
            <b className="salesCard-b">Amount: </b>${buy.sale_amount}
          </p>
          <p className="salesCard-p">
            <b className="salesCard-b">Instalments: </b>
            {buy.sale_instalments}
          </p>
        </div>

        <div className="salesCard-rate">
          {rated ? (
            <p className="salesCard-p">You've already rated the seller.</p>
          ) : (
            <button className="button-grayBlue" onClick={(e) => handleRate(e)}>
              Rate seller
            </button>
          )}
        </div>
        <hr className="saleCard-hr" />
      </article>
    </>
  );
};

export default BuysCard;
