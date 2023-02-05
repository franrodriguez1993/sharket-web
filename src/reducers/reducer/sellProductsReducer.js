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
    offer: 0,
  },
  image: { preview: "", data: "" },
  descriptionImage: { preview: "", data: "" },
  productImages: [],
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

    /**  HANDLE FILE CHANGE (DESCRIPTION IMAGE)  **/
    case TYPES_SELLPRODUCTS.handleFileChangeDI:
      return { ...state, descriptionImage: action.payload };
    /**    RESET IMG FILE   **/
    case TYPES_SELLPRODUCTS.resetImgFile:
      return { ...state, image: { preview: "", data: "" } };

    /**  RESET IMG DESCRIPTION FILE ***/
    case TYPES_SELLPRODUCTS.resetImgDescrFile:
      return { ...state, descriptionImage: { preview: "", data: "" } };
    /**   SET ERROR FORM   **/
    case TYPES_SELLPRODUCTS.setErrorForm:
      return { ...state, errors: action.payload };

    /**   SET ERROR FETCH   **/
    case TYPES_SELLPRODUCTS.setErrorFetch:
      return { ...state, errorFetch: action.payload, loading: false };

    /**   SET LOADING  **/
    case TYPES_SELLPRODUCTS.setLoading:
      return { ...state, loading: true };

    /**  SET DATA FORM EDIT    **/
    case TYPES_SELLPRODUCTS.setDataFormEdit:
      return { ...state, form: action.payload };

    /**    SET IMAGE THUMBNAIL DATA    **/
    case TYPES_SELLPRODUCTS.setImageThumbnailData:
      return { ...state, image: action.payload };

    /** SET PRODUCT IMAGES  **/
    case TYPES_SELLPRODUCTS.setProductImages:
      return { ...state, productImages: action.payload };

    /** ADD PRODUCT IMAGES  **/
    case TYPES_SELLPRODUCTS.addProductImage:
      return {
        ...state,
        loading: false,
        productImages: [
          ...state.productImages,
          { ip_id: action.payload.ip_id, ip_path: action.payload.ip_path },
        ],
      };

    /** DELETE PRODUCT IMAGES  **/
    case TYPES_SELLPRODUCTS.deleteProductImage:
      return {
        ...state,
        loading: false,
        productImages: state.productImages.filter(
          (i) => i.ip_id !== action.payload
        ),
      };
    default:
      return state;
  }
};
