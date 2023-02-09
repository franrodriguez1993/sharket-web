import React, { useContext } from "react";
import useProfile from "../../hooks/useProfile";
import { UserContext } from "../../context/UserProvider";
import SectionLoader from "../../components/accesories/SectionLoader";
import CreditCardContainer from "../../components/ProfileRoute/CreditCardContainer";
import CreditCardForm from "../../components/ProfileRoute/CreditCardForm";
const CreditCardRoute = () => {
  const { user, logIn, token } = useContext(UserContext);
  const {
    errorsForm,
    errorFetch,
    loading,
    creditCardForm,
    creditcardList,
    HCCreditCard,
    HSDeleteCreditCard,
    HSCreditCard,
  } = useProfile(user, token, logIn);
  return (
    <div className="routeContainer">
      <h1 className="title"> Credit Card</h1>

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

      {/**  CONTAINER CREDIT CARDS   **/}
      <CreditCardContainer
        creditcardList={creditcardList}
        HSDeleteCreditCard={HSDeleteCreditCard}
      />

      {/**  FORM CREDIT CARDS   **/}

      {creditcardList.length < 3 ? (
        <CreditCardForm
          errorsForm={errorsForm}
          creditCardForm={creditCardForm}
          HCCreditCard={HCCreditCard}
          HSCreditCard={HSCreditCard}
        />
      ) : (
        <div className="cc-nocc mt-5">
          <p className="cc-nocc fw-bolder">
            you have reached the limit of credit cards. Please delete one if you
            want to add a new one.
          </p>
        </div>
      )}
    </div>
  );
};

export default CreditCardRoute;
