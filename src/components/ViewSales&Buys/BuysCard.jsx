import React, { useState, useEffect } from "react";
import "../../css/viewSales&Buys/BuysCard.css";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";

TimeAgo.setDefaultLocale(en.locale);
TimeAgo.addLocale(en);
const BuysCard = ({ buy }) => {
  const [products, setProducts] = useState([]);

  /**  -------- USE EFFECT --------  **/
  useEffect(() => {
    //get products name and quantity:
    const pq = buy.sale_products.map((p) => {
      return { product: p.product.product_name, quantity: p.sp_quantity };
    });
    setProducts(pq);
  }, [buy]);

  return (
    <>
      <article className="buysCard">
        <div className="buysCard-product">
          {products.length !== 0 &&
            products.map((p, index) => (
              <div key={index}>
                <p className="buysCard-p">
                  <b className="buysCard-b">Product: </b>
                  {p.product}
                </p>
                <p className="buysCard-p">
                  <b className="buysCard-b">Units: </b>
                  {p.quantity}
                </p>
              </div>
            ))}
        </div>

        <div className="buysCard-amount">
          <p className="buysCard-p">
            <b className="buysCard-b">Amount: </b>${buy.sale_amount}
          </p>
          <p className="buysCard-p">
            <b className="buysCard-b">Instalments: </b>
            {buy.sale_instalments}
          </p>
        </div>

        <div className="buysCard-product">
          <p className="buysCard-p">
            <b className="buysCard-b">Date: </b>
            <ReactTimeAgo date={Date.parse(buy.createdAt)} locale="en-US" />
          </p>
        </div>

        <hr className="saleCard-hr" />
      </article>
    </>
  );
};

export default React.memo(BuysCard);
