import React, { useContext } from "react";
import EditForm from "../../components/EditProductRoute/EditForm";
import "../../css/ProductsRoute/EditProductRoute.css";
//context:
import { UserContext } from "../../context/UserProvider";
//Reducer:
import TYPES_SELLPRODUCTS from "../../reducers/types/sellProductsTypes";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Hook:
import useSell from "../../hooks/useSell";
import { useParams } from "react-router-dom";
//Components:
import SectionLoader from "../../components/accesories/SectionLoader";
import DescImagesForm from "../../components/EditProductRoute/DescImagesForm";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const EditProductRoute = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const {
    form,
    filteredTypes,
    categories,
    addresses,
    dispatch,
    handleChange,
    handleImageChange,
    handleDescrImgChange,
    image,
    errors,
    errorFetch,
    loading,
    handleUpdateProduct,
    productImages,
    descriptionImage,
    handleUploadDescImg,
    handleDelDescrImg,
  } = useSell(user, id);

  return (
    <div className="routeContainer">
      <h1 className="title"> Edit product</h1>
      {errorFetch && (
        <div className="alert-error-container">
          <h3 className="text-error">{errorFetch}</h3>
        </div>
      )}
      <EditForm
        form={form}
        filteredTypes={filteredTypes}
        categories={categories}
        addresses={addresses}
        dispatch={dispatch}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        image={image}
        errors={errors}
        handleUpdateProduct={handleUpdateProduct}
      />

      <DescImagesForm
        images={productImages}
        descriptionImage={descriptionImage}
        dispatch={dispatch}
        handleDescrImgChange={handleDescrImgChange}
        handleUploadDescImg={handleUploadDescImg}
        handleDelDescrImg={handleDelDescrImg}
      />

      {loading && (
        <div className="modal-container">
          <SectionLoader />
          <p className="modal-text">Updating product...</p>
        </div>
      )}
    </div>
  );
};

export default EditProductRoute;
