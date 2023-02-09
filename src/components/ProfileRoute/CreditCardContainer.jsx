import React from "react";
import CreditCardCard from "./CreditCardCard";
const CreditCardContainer = ({ creditcardList, HSDeleteCreditCard }) => {
  return (
    <>
      {creditcardList.length !== 0 ? (
        <div className="container-cards_row">
          <h3 className="mt-3 fw-bold">My credit cards</h3>
          {creditcardList.map((c) => (
            <CreditCardCard
              key={c.cc_id}
              cc={c}
              HSDeleteCreditCard={HSDeleteCreditCard}
            />
          ))}
        </div>
      ) : (
        <div className="address-noaddress">
          <b className="address-noaddress_p">
            You don't have credit cards registered yet.
          </b>
        </div>
      )}
    </>
  );
};

export default React.memo(CreditCardContainer);
