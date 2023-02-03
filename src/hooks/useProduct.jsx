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
const useProduct = (user) => {
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
  } = productState;

  /**  ============================= USE EFFECT ===============================  **/
  //set addresses - seller - category and types.
  useEffect(() => {
    //Set addresses:
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
  }, []);

  /**  ========================= HANDLE FORM CHANGE  ============================  **/
  const handleChange = (e) => {
    dispatch({
      type: TYPES_SELLPRODUCTS.handleChange,
      payload: e.target,
    });
  };

  /**  ========================= HANDLE IMAGE CHANGE  ============================  **/

  const handleImageChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    dispatch({ type: TYPES_SELLPRODUCTS.handleFileChange, payload: img });
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
    if (!form.price || !form.price.trim()) {
      formErrors.price = "Required field";
    }
    if (!form.stock || !form.stock.trim()) {
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
    image,
    handleSellProduct,
    loading,
    errorFetch,
  };
};

export default useProduct;
