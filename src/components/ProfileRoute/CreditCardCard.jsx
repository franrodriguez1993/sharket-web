import React from "react";

const CreditCardCard = ({ cc, HSDeleteCreditCard }) => {
  return (
    <article className="ccCard">
      <div className="ccCard-name">
        <p className="ccCard-p">
          <b className="ccCard-b">Name: </b>
          {cc.cc_name}
        </p>
        <p className="ccCard-p">
          <b className="ccCard-b">Number: </b>
          {`${cc.cc_number.slice(0, 4)}**** ****`}
        </p>
        <p className="ccCard-p">
          <b className="ccCard-b">Bank: </b>
          {cc.cc_bank}
        </p>
      </div>
      <div className="ccCard-date">
        <p className="ccCard-p">
          <b className="ccCard-b">Date: </b>
          {cc.cc_date}
        </p>
        <p className="ccCard-p">
          <b className="ccCard-b">Code: </b>
          {`${cc.cc_code[0]}**`}
        </p>
      </div>
      <div className="container-option">
        <button
          className="button-blue"
          onClick={(e) => HSDeleteCreditCard(e, cc.cc_id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default CreditCardCard;
