import React from "react";
import AddressCard from "./AddressCard";

const AddressesContainer = ({ addressesList, HSDeleteAddress }) => {
  return (
    <>
      {addressesList.length !== 0 ? (
        <div className="container-cards_row">
          <h3 className="mt-3 fw-bold">My addresses</h3>
          {addressesList.map((a) => (
            <AddressCard
              key={a.address_id}
              address={a}
              HSDeleteAddress={HSDeleteAddress}
            />
          ))}
        </div>
      ) : (
        <div className="address-noaddress">
          <b className="address-noaddress_p">
            You don't have addresses registered yet.
          </b>
        </div>
      )}
    </>
  );
};

export default React.memo(AddressesContainer);
