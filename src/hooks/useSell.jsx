import { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Reducer:
import {
  sellProductReducer,
  initialState,
} from "../reducers/reducer/sellProductsReducer";
import TYPES_SELLPRODUCTS from "../reducers/types/sellProductsTypes";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Fetch:
import ManageFetch from "../utils/manageFetch";
import { URL_API } from "../utils/URL";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Cookie:
import { cookieManager, FORMTIME } from "../utils/cookieManager";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/** HOOK: **/
const useSell = (user, id = "") => {
  const navigate = useNavigate();
  const [productState, dispatch] = useReducer(sellProductReducer, initialState);
  const { FetchFunction } = ManageFetch();
  const {
    form,
    errors,
    types,
    categories,
    addresses,
    filteredTypes,
    image,
    loading,
    errorFetch,
    productImages,
    descriptionImage,
  } = productState;

  /**  ============================= USE EFFECT ===============================  **/
  //set addresses - seller - category and types.
  useEffect(() => {
    //Set addresses:
    if (!user) return;
    dispatch({
      type: TYPES_SELLPRODUCTS.dataAddresses,
      payload: user.user_addresses,
    });
    //Set seller:
    dispatch({ type: TYPES_SELLPRODUCTS.setSeller, payload: user.user_id });
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Set categories:
    const categoryCookie = cookieManager.get("categories-sharknet");
    if (!categoryCookie) {
      FetchFunction({ url: `${URL_API}/pcategory/list` }).then((res) => {
        if (!res) return;
        else if (res.status === 200) {
          dispatch({
            type: TYPES_SELLPRODUCTS.dataCategories,
            payload: res.data,
          });
          cookieManager.set("categories-sharknet", res.data, {
            maxAge: FORMTIME,
          });
        }
      });
    } else {
      dispatch({
        type: TYPES_SELLPRODUCTS.dataCategories,
        payload: categoryCookie,
      });
    }
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Set types:
    const typeCookie = cookieManager.get("types-sharknet");
    if (!typeCookie) {
      FetchFunction({ url: `${URL_API}/ptype/list` }).then((res) => {
        if (!res) return;
        else if (res.status === 200) {
          dispatch({ type: TYPES_SELLPRODUCTS.dataTypes, payload: res.data });
          cookieManager.set("types-sharknet", res.data, { maxAge: FORMTIME });
        }
      });
    } else {
      dispatch({
        type: TYPES_SELLPRODUCTS.dataTypes,
        payload: typeCookie,
        filteredTypes: typeCookie,
      });
    }
  }, [user]);

  /**================== USE EFFECT EDIT PRODUCT DATA ==================**/
  useEffect(() => {
    if (id === "") return;
    const url = `${URL_API}/product/list/${id}`;
    FetchFunction({ url }).then((res) => {
      if (res.status === 200) {
        const product = res.data;

        const editForm = {
          category: product.pc_id,
          type: product.product_type.pt_id,
          name: product.product_name,
          brand: product.product_brand,
          description: product.product_description,
          price: product.product_price,
          offer: product.product_offer,
          status: product.product_status,
          stock: product.product_stock,
          address: product.user_address.address_id,
          warranty: product.product_warranty,
        };
        //Set form data:
        dispatch({
          type: TYPES_SELLPRODUCTS.setDataFormEdit,
          payload: editForm,
        });
        //Set thumbnail data:
        dispatch({
          type: TYPES_SELLPRODUCTS.setImageThumbnailData,
          payload: { data: "", preview: product.product_thumbnail },
        });
        //Set images data:
        dispatch({
          type: TYPES_SELLPRODUCTS.setProductImages,
          payload: product.image_products,
        });
      }
    });
  }, []);

  /**  ========================= HANDLE FORM CHANGE  ============================  **/
  const handleChange = (e) => {
    dispatch({
      type: TYPES_SELLPRODUCTS.handleChange,
      payload: e.target,
    });
  };

  /**  ========================= HANDLE IMAGE CHANGE (THUMBNAIL) ============================  **/

  const handleImageChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    dispatch({ type: TYPES_SELLPRODUCTS.handleFileChange, payload: img });
  };

  /**  ========================= HANDLE IMAGE CHANGE (DESCRIPTION) ============================  **/

  const handleDescrImgChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    dispatch({ type: TYPES_SELLPRODUCTS.handleFileChangeDI, payload: img });
  };

  /**  ========================= VALIDATION FORM FUNCTION ============================  **/
  function validationForm() {
    let formErrors = {};
    if (!form.category || !form.category.trim()) {
      formErrors.category = "Required field";
    }
    if (!form.type || !form.type.trim()) {
      formErrors.type = "Required field";
    }
    if (!form.name || !form.name.trim()) {
      formErrors.name = "Required field";
    } else if (form.name.trim() > 60 || form.name.trim() < 4) {
      formErrors.name = "Field must be more than 4 and less than 60 characters";
    }
    if (!form.brand || !form.brand.trim()) {
      formErrors.brand = "Required field";
    } else if (form.brand.trim() > 60 || form.brand.trim() < 4) {
      formErrors.brand =
        "Field must be more than 4 and less than 60 characters";
    }
    if (!form.price) {
      formErrors.price = "Required field";
    } else if (form.price < 0 || form.price > 10000000) {
      formErrors.price = "Invalid price";
    }
    if (!form.stock) {
      formErrors.stock = "Required field";
    }
    if (!form.status || !form.status.trim()) {
      formErrors.status = "Required field";
    }
    if (!form.address || !form.address.trim()) {
      formErrors.address = "Required field";
    }
    if (!form.description || !form.description.trim()) {
      formErrors.description = "Required field";
    }
    return formErrors;
  }

  /**  ========================= FUNCTION CREATE IMAGE ============================  **/
  function createImage(id) {
    if (image.data === "") return;
    let imgData = new FormData();
    imgData.append("product", image.data);

    let url = `${URL_API}/product/edit/thumbnail/${id}`;
    FetchFunction({ url, method: "PUT", body: imgData, files: true }).then(
      (res) => {
        if (res.status !== 201) {
          dispatch({
            type: TYPES_SELLPRODUCTS.setErrorFetch,
            payload: "ERROR: Image could not be uploaded.",
          });
        } else {
          navigate(`/product/${id}`);
        }
      }
    );
  }

  /**  ======================== HANDLE UPLOAD DESCRIPTION IMAGE =================  **/
  const handleUploadDescImg = (e) => {
    e.preventDefault();
    if (descriptionImage.data === "") return;
    const url = `${URL_API}/image/product/upload/${id}`;
    dispatch({ type: TYPES_SELLPRODUCTS.setLoading });
    let imgData = new FormData();
    imgData.append("image", descriptionImage.data);
    FetchFunction({ url, body: imgData, files: true, method: "POST" }).then(
      (res) => {
        if (res.status === 201) {
          dispatch({
            type: TYPES_SELLPRODUCTS.addProductImage,
            payload: res.data,
          });
          dispatch({ type: TYPES_SELLPRODUCTS.resetImgDescrFile });
        }
      }
    );
  };
  /**  ======================== HANDLE DELETE DESCRIPTION IMAGE =================  **/
  const handleDelDescrImg = (e, pid) => {
    e.preventDefault();
    const url = `${URL_API}/image/product/del/${pid}`;
    dispatch({ type: TYPES_SELLPRODUCTS.setLoading });
    FetchFunction({ url, method: "DELETE" }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: TYPES_SELLPRODUCTS.deleteProductImage, payload: pid });
      } else {
        dispatch({
          type: TYPES_SELLPRODUCTS.setErrorFetch,
          payload: "Error deleting photo",
        });
      }
    });
  };
  /**  ========================= HANDLE SELL PRODUCT ============================  **/

  const handleSellProduct = (e) => {
    e.preventDefault();

    //Check Form:
    const checkErrors = validationForm();
    if (Object.keys(checkErrors).length !== 0) {
      return dispatch({
        type: TYPES_SELLPRODUCTS.setErrorForm,
        payload: checkErrors,
      });
    }

    //Create product:
    const url = `${URL_API}/product/create`;
    dispatch({ type: TYPES_SELLPRODUCTS.setLoading });
    FetchFunction({ url, method: "POST", body: form }).then((res) => {
      if (!res) {
        dispatch({
          type: TYPES_SELLPRODUCTS.setErrorFetch,
          payload: "ERROR: Product could not be created.",
        });
      } else if (res.status === 201) {
        if (image.data === "") {
          navigate(`/product/${res.data}`);
        } else {
          createImage(res.data);
        }
      }
    });
  };

  /**  ==================== HANDLE UPDATE PRODUCT ====================  **/
  const handleUpdateProduct = (e) => {
    e.preventDefault();

    //Check Form:
    const checkErrors = validationForm();
    if (Object.keys(checkErrors).length !== 0) {
      return dispatch({
        type: TYPES_SELLPRODUCTS.setErrorForm,
        payload: checkErrors,
      });
    }

    const url = `${URL_API}/product/edit/${id}`;
    dispatch({ type: TYPES_SELLPRODUCTS.setLoading });
    FetchFunction({ url, method: "PUT", body: form }).then((res) => {
      if (res.status === 200) {
        if (image.data === "") {
          return navigate(`/product/${id}`);
        } else {
          createImage(res.data);
        }
      } else {
        dispatch({
          type: TYPES_SELLPRODUCTS.setErrorFetch,
          payload: "Server error",
        });
      }
    });
  };

  return {
    form,
    errors,
    types,
    categories,
    addresses,
    filteredTypes,
    dispatch,
    handleChange,
    handleImageChange,
    handleDescrImgChange,
    image,
    handleSellProduct,
    loading,
    errorFetch,
    productImages,
    descriptionImage,
    handleUpdateProduct,
    handleUploadDescImg,
    handleDelDescrImg,
  };
};

export default useSell;
