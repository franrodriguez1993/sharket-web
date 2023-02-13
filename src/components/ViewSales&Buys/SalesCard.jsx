import React from "react";
import "../../css/viewSales&Buys/SalesCard.css";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";

TimeAgo.setDefaultLocale(en.locale);
TimeAgo.addLocale(en);
const SalesCard = ({ sale }) => {
  return (
    <>
      <article className="salesCard">
        <div className="salesCard-img_container">
          <img
            src={sale.product.product_thumbnail || "/assets/img/default.jpg"}
            alt="product"
            className="salesCard-img"
          />
        </div>

        <div className="salesCard-product">
          <p className="salesCard-p">
            <b className="salesCard-b">Product: </b>
            {sale.product.product_name}
          </p>
          <p className="salesCard-p">
            <b className="salesCard-b">Units: </b>
            {sale.sp_quantity}
          </p>
        </div>

        <div className="salesCard-product">
          <p>
            <b>Date: </b>
            <ReactTimeAgo date={Date.parse(sale.createdAt)} locale="en-US" />
          </p>
        </div>
      </article>
    </>
  );
};

export default SalesCard;
