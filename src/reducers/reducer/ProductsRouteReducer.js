import TYPES_PRODUCTSROUTE from "../types/ProductsRouteTypes";

/**  INITIAL STATES  **/

export const initialStates = {
  loading: false,
  products: [],
  errorFetch: "",
  page: 0,
  currentPage: 1,
  totalPages: 1,
};

/**  REDUCER  **/

export const productsReducer = (state, action) => {
  switch (action.type) {
    /**  LOADING **/
    case TYPES_PRODUCTSROUTE.setLoading:
      return { ...state, loading: true };
    /**  ERROR **/
    case TYPES_PRODUCTSROUTE.setError:
      return { ...state, loading: false, errorFetch: action.payload };
    /**  SET PRODUCTS **/
    case TYPES_PRODUCTSROUTE.setProducts:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    /**  NEXT PAGE **/
    case TYPES_PRODUCTSROUTE.nextPage:
      return { ...state, page: state.page + 1 };
    /**  PREVIOUS PAGE **/
    case TYPES_PRODUCTSROUTE.previousPage:
      return { ...state, page: state.page - 1 };
    default:
      return state;
  }
};
