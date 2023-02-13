import React, { useContext } from "react";
import "../../css/ProductsRoute/SellProductsRoute.css";
import useSell from "../../hooks/useSell";
import { UserContext } from "../../context/UserProvider";

//Components:
import SellForm from "../../components/SellProductRoute/SellForm";
import SectionLoader from "../../components/accesories/SectionLoader";

const SellProductRoute = () => {
  const { user } = useContext(UserContext);
  const {
    form,
    errors,
    categories,
    addresses,
    filteredTypes,
    dispatch,
    handleChange,
    handleImageChange,
    image,
    handleSellProduct,
    loading,
    errorFetch,
  } = useSell(user);

  return (
    <div className="sellProduct-container">
      <h2 className="sellProduct-title">Sell product</h2>

      {/**  ERROR SECTION  **/}
      {errorFetch && (
        <div className="sellProduct-error">
          <h5 className="sellProduct-error_text">{errorFetch}</h5>
        </div>
      )}

      {/**  FORM SELL   **/}
      <SellForm
        form={form}
        categories={categories}
        filteredTypes={filteredTypes}
        addresses={addresses}
        dispatch={dispatch}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        image={image}
        errors={errors}
        handleSellProduct={handleSellProduct}
      />

      {/**  MODAL LOADING   **/}
      {loading && (
        <div className="modal-container">
          <SectionLoader />
          <p className="modal-text ">Creating Product...</p>
        </div>
      )}
    </div>
  );
};

export default SellProductRoute;
