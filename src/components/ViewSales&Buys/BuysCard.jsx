import React, { useState, useEffect } from "react";
import "../../css/viewSales&Buys/SalesCard.css";
import TYPES_USERSALES from "../../reducers/types/userSalesTypes";
const BuysCard = ({ buy, dispatch, user }) => {
  const [userRated, setUserRated] = useState(false);
  const [productRated, setProductRated] = useState(false);
  /**  -------- USE EFFECT --------  **/
  useEffect(() => {
    //Check user valoration:
    if (buy.user_reputations.length !== 0) {
      const check = buy.user_reputations.filter((s) => s.ur_rol === "seller");
      if (check.length !== 0) {
        setUserRated(true);
      } else {
        setUserRated(false);
      }
    } else {
      setUserRated(false);
    }

    //Check product valoration:
    if (buy.product_reputations.length === 0) {
      setProductRated(false);
    } else {
      setProductRated(true);
    }
  }, [buy]);

  /**  HANDLE CLICK RATE USER **/
  const handleUserRate = (e) => {
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

  /**  HANDLE CLICK RATE PRODUCT **/
  const handleProductRate = (e) => {
    e.preventDefault();
    dispatch({
      type: TYPES_USERSALES.setProductForm,
      payload: {
        qualifier: user.user_id,
        product: buy.sale_products[0].product.product_id,
        sale: buy.sale_id,
        rs_id: "",
        description: "",
      },
    });
    dispatch({ type: TYPES_USERSALES.setModalProduct });
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
          {/** USER VALORATION:   **/}
          {userRated ? (
            <p className="salesCard-p">You've already rated the seller.</p>
          ) : (
            <button
              className="button-grayBlue"
              onClick={(e) => handleUserRate(e)}
            >
              Rate seller
            </button>
          )}
          {/**  PRODUCT VALORATION:  **/}
          {productRated ? (
            <p className="salesCard-p">You've already rated the product.</p>
          ) : (
            <button
              className="button-grayBlue"
              onClick={(e) => handleProductRate(e)}
            >
              Rate Product
            </button>
          )}
        </div>
        <hr className="saleCard-hr" />
      </article>
    </>
  );
};

export default React.memo(BuysCard);
