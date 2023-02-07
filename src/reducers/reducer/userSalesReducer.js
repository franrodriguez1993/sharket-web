import TYPES_USERSALES from "../types/userSalesTypes";

/**     --------   INITIAL STATES ---------     **/
export const initialStates = {
  sales: [],
  buys: [],
  scores: [],
  loading: false,
  modal: false,
  modalProduct: false,
  errors: "",
  errorModal: "",
  errorModalProduct: "",
  page: 0,
  currentPage: 0,
  totalPages: 0,
  form: {
    qualifier: "",
    receiver: "",
    sale: "",
    rs_id: "",
    rol: "",
    description: "",
  },
  productForm: {
    qualifier: "",
    sale: "",
    rs_id: "",
    rol: "",
    description: "",
  },
};

/**     --------   FUNCTION REDUCER ---------     **/

export function userSalesReducer(state, action) {
  switch (action.type) {
    /**  SET SALES    **/
    case TYPES_USERSALES.setSales:
      return {
        ...state,
        sales: action.payload.sales,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        loading: false,
      };

    /**  SET BUYS    **/
    case TYPES_USERSALES.setBuys:
      return {
        ...state,
        buys: action.payload.sales,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        loading: false,
      };

    /**  SET LOADING    **/
    case TYPES_USERSALES.setLoading:
      return { ...state, loading: true };

    /**  SET ERROR    **/
    case TYPES_USERSALES.setError:
      return { ...state, loading: false, errors: action.payload };

    /**  SET BACK PAGE    **/
    case TYPES_USERSALES.setBackPage:
      return { ...state, page: state.page - 1 };

    /**  SET NEXT PAGE    **/
    case TYPES_USERSALES.setNextPage:
      return { ...state, page: state.page + 1 };

    /**  SET MODAL    **/
    case TYPES_USERSALES.setModal:
      return { ...state, modal: true };

    /**  SET MODAL PRODUCT   **/
    case TYPES_USERSALES.setModalProduct:
      return { ...state, modalProduct: true };

    /**  SET CLOSE MODAL PRODUCT   **/
    case TYPES_USERSALES.setCloseModalProduct:
      return { ...state, modalProduct: false };

    /**  SET CLOSE MODAL    **/

    case TYPES_USERSALES.setCloseModal:
      return { ...state, modal: false };

    /**  SET SCORES **/
    case TYPES_USERSALES.setScores:
      return { ...state, scores: action.payload, loading: false };

    /**  SET FORM **/
    case TYPES_USERSALES.setForm:
      return { ...state, form: action.payload };

    /**  SET PRODUCT FORM     **/
    case TYPES_USERSALES.setProductForm:
      return { ...state, productForm: action.payload };

    /**  SET HANDLE CHANGE **/
    case TYPES_USERSALES.setHandleChange:
      return {
        ...state,
        form: { ...state.form, [action.payload.name]: action.payload.value },
      };

    /**  SET HANDLE CHANGE PRODUCT **/
    case TYPES_USERSALES.setHandleChangeProduct:
      return {
        ...state,
        productForm: {
          ...state.productForm,
          [action.payload.name]: action.payload.value,
        },
      };

    /**  SET ERROR MODAL    **/
    case TYPES_USERSALES.setErrorModal:
      return { ...state, errorModal: action.payload };

    /**  SET ERROR MODAL    **/
    case TYPES_USERSALES.setErrorModalProduct:
      return { ...state, errorModalProduct: action.payload };

    /**  UPDATE RATED SALES    **/
    case TYPES_USERSALES.updateRatedSales:
      return {
        ...state,
        loading: false,
        form: state.initialStates,
        sales: state.sales.map((s) =>
          s.sale_id === action.payload
            ? {
                ...s,
                user_reputations: [...s.user_reputations, { ur_rol: "buyer" }],
              }
            : s
        ),
      };

    /**  UPDATE RATED BUYS    **/
    case TYPES_USERSALES.updateRatedBuys:
      return {
        ...state,
        loading: false,
        form: initialStates.form,
        buys: state.buys.map((s) =>
          s.sale_id === action.payload
            ? {
                ...s,
                user_reputations: [...s.user_reputations, { ur_rol: "seller" }],
              }
            : s
        ),
      };

    /**  UPDATE RATED PRODUCTS    **/
    case TYPES_USERSALES.updateRatedProducts:
      return {
        ...state,
        loading: false,
        productForm: initialStates.productForm,
        buys: state.buys.map((s) =>
          s.sale_id === action.payload.sale_id
            ? {
                ...s,
                product_reputations: [
                  ...s.product_reputations,
                  { product_id: action.payload.product_id },
                ],
              }
            : s
        ),
      };

    default:
      return state;
  }
}
