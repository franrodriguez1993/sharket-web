import React from "react";
//SVG:
import verified from "../../svg/verified.svg";
//Component:
import ReputationSeller from "./ReputationSeller";
import SectionLoader from "../accesories/SectionLoader";
const SellerData = ({
  seller,
  address,
  reputations,
  loadingReputationSeller,
}) => {
  return (
    <article className="sellerData-container">
      <div>
        {seller.user_image ? (
          <img src={seller.user_image} alt="user-img" className="seller-img" />
        ) : (
          <img
            src="/assets/img/userDefault.png"
            alt="user-img"
            className="seller-img"
          />
        )}
        {seller.Rol.rol_name === "store" && (
          <img src={verified} alt="verified-user" className="verified-img" />
        )}
      </div>
      <h5 className="sellerData-username">{seller.user_username}</h5>
      <hr className="sellderData-hr" />
      <b>Address</b>
      <p className="sellerData-address">
        {address.address_state} - {address.address_city}
      </p>
      <hr className="sellderData-hr" />

      {loadingReputationSeller ? (
        <>
          <SectionLoader />
        </>
      ) : (
        <>
          <ReputationSeller reputations={reputations} />
        </>
      )}
    </article>
  );
};

export default React.memo(SellerData);