import React from "react";

const AddressCard = ({ address, HSDeleteAddress }) => {
  return (
    <article className="addressCard">
      <div className="addresscard-street">
        <p className="addresscard-p">
          <b className="addresscard-b">Street: </b>
          {address.address_street}
        </p>
        <p className="addresscard-p">
          <b className="addresscard-b">Number: </b>
          {address.address_number || "---"}
        </p>

        {address.address_floor && (
          <p className="addresscard-p">
            <b className="addresscard-b">Floor: </b>
            {address.address_floor}
          </p>
        )}
        {address.address_apartment && (
          <p className="addresscard-p">
            <b className="addresscard-b">Apartment: </b>
            {address.address_apartment}
          </p>
        )}
      </div>
      <div className="addresscard-city">
        <p className="addresscard-p">
          <b className="addresscard-b">City: </b>
          {address.address_city}
        </p>
        <p className="addresscard-p">
          <b className="addresscard-b">State: </b>
          {address.address_state}
        </p>
      </div>
      <div className="container-option">
        <button
          className="button-blue"
          onClick={(e) => HSDeleteAddress(e, address.address_id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default AddressCard;
