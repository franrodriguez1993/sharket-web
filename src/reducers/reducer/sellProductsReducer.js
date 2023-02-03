import TYPES_SELLPRODUCTS from "../types/sellProductsTypes";

/**  INITIAL STATES   **/
export const initialState = {
  form: {
    types: "",
    seller: "",
    name: "",
    brand: "",
    price: 0,
    stock: 0,
    description: "",
    status: "",
    warranty: 0,
    address: "",
    category: "",
  },
  image: { preview: "", data: "" },
  loading: false,
  errors: {},
  errorFetch: "",
  types: [],
  filteredTypes: [],
  categories: [],
  addresses: [],
};

/**    FUNCTION REDUCER    **/

export const sellProductReducer = (state, action) => {
  switch (action.type) {
    /**    HANDLE CHANGE FORM    **/
    case TYPES_SELLPRODUCTS.handleChange:
      return {
        ...state,
        form: { ...state.form, [action.payload.name]: action.payload.value },
      };

    /**   DATA ADDRESSES   **/
    case TYPES_SELLPRODUCTS.dataAddresses:
      return { ...state, addresses: action.payload };

    /**   DATA CATEGORIES   **/
    case TYPES_SELLPRODUCTS.dataCategories:
      return { ...state, categories: action.payload };

    /**   DATA TYPES   **/
    case TYPES_SELLPRODUCTS.dataTypes:
      return { ...state, types: action.payload, filteredTypes: action.payload };
    /**   SET SELLER   **/
    case TYPES_SELLPRODUCTS.setSeller:
      return { ...state, form: { ...state.form, seller: action.payload } };

    /**   RESET TYPES:   **/
    case TYPES_SELLPRODUCTS.resetTypes:
      return { ...state, filteredTypes: state.types };

    /**   RESET FORM:   **/
    case TYPES_SELLPRODUCTS.resetForm:
      return { ...state, form: initialState.form, loading: false };

    /**   FILTER TYPES BY CATEGORY:   **/
    case TYPES_SELLPRODUCTS.filterTypesByCategory:
      return {
        ...state,
        filteredTypes: state.types.filter(
          (t) => t.product_category.pc_id === action.payload
        ),
      };

    /**    HANDLE FILE CHANGE    **/
    case TYPES_SELLPRODUCTS.handleFileChange:
      return { ...state, image: action.payload };

    /**    RESET IMG FILE   **/
    case TYPES_SELLPRODUCTS.resetImgFile:
      return { ...state, image: { preview: "", data: "" } };

    /**   SET ERROR FORM   **/
    case TYPES_SELLPRODUCTS.setErrorForm:
      return { ...state, errors: action.payload };

    /**   SET ERROR FETCH   **/
    case TYPES_SELLPRODUCTS.setErrorFetch:
      return { ...state, errorFetch: action.payload, loading: false };

    /**   SET LOADING  **/
    case TYPES_SELLPRODUCTS.setLoading:
      return { ...state, loading: true };
    default:
      return state;
  }
};
