import TYPES_MYPRODUCTS from "../types/myProductsRouteTypes";

/**  INITIAL STATES  **/

export const initialStates = {
  products: [],
  loading: false,
  errors: "",
  page: 0,
  totalPage: 0,
  currentPage: 0,
};

export const myProductsReducer = (state, action) => {
  switch (action.type) {
    /**  SET PRODUCTS   **/
    case TYPES_MYPRODUCTS.setProducts:
      return {
        ...state,
        errors: "",
        products: action.payload.products,
        totalPage: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        loading: false,
      };

    /**  SET LOADING   **/
    case TYPES_MYPRODUCTS.loading:
      return { ...state, errors: "", loading: true };

    /**  SET ERRORS   **/
    case TYPES_MYPRODUCTS.setError:
      return { ...state, errors: action.payload, loading: false };

    /**  BACK PAGE   **/
    case TYPES_MYPRODUCTS.backPage:
      return { ...state, errors: "", page: state.page - 1 };

    /**  NEXT PAGE   **/
    case TYPES_MYPRODUCTS.nextPage:
      return { ...state, errors: "", page: state.page + 1 };

    /**  PAUSE PRODUCT  **/
    case TYPES_MYPRODUCTS.pauseProduct:
      return {
        ...state,
        loading: false,
        errors: "",
        products: state.products.map((p) =>
          p.product_id === action.payload
            ? { ...p, product_condition: "paused" }
            : p
        ),
      };

    /**  REACTIVATE PRODUCT   **/
    case TYPES_MYPRODUCTS.reactivateProduct:
      return {
        ...state,
        loading: false,
        errors: "",
        products: state.products.map((p) =>
          p.product_id === action.payload
            ? { ...p, product_condition: "active" }
            : p
        ),
      };
    /**  DELETE PRODUCT   **/
    case TYPES_MYPRODUCTS.deleteProduct:
      return {
        ...state,
        loading: false,
        errors: "",
        products: state.products.filter((p) => p.product_id !== action.payload),
      };
    default:
      return state;
  }
};
