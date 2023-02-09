import React, { useContext } from "react";
import useProfile from "../../hooks/useProfile";
import { UserContext } from "../../context/UserProvider";
import AddressesContainer from "../../components/ProfileRoute/AddressesContainer";
import SectionLoader from "../../components/accesories/SectionLoader";
import AddressForm from "../../components/ProfileRoute/AddressForm";

const AddressRoute = () => {
  const { user, logIn, token } = useContext(UserContext);
  const {
    errorsForm,
    errorFetch,
    loading,
    addressesList,
    addressForm,
    HSDeleteAddress,
    HCAddress,
    HSAdress,
  } = useProfile(user, token, logIn);
  return (
    <div className="routeContainer">
      <h1 className="title">Address</h1>

      {/**  ERROR FETCH   **/}
      {errorFetch && (
        <div className="alert-error-container">
          <p className="text-error">{errorFetch}</p>
        </div>
      )}

      {/**  LOADING  **/}
      {loading && (
        <div className="modal-container">
          <SectionLoader />
        </div>
      )}

      {/**  ADDRESSES LIST  **/}
      <AddressesContainer
        addressesList={addressesList}
        HSDeleteAddress={HSDeleteAddress}
      />

      {/**  ADDRESS FORM  **/}

      {addressesList.length < 3 ? (
        <AddressForm
          errorsForm={errorsForm}
          addressForm={addressForm}
          HCAddress={HCAddress}
          HSAdress={HSAdress}
        />
      ) : (
        <div className="address-noaddress mt-5">
          <p className="address-noaddress_p fw-bolder">
            you have reached the limit of addresses. Please delete one if you
            want to add a new one.
          </p>
        </div>
      )}
    </div>
  );
};

export default AddressRoute;
