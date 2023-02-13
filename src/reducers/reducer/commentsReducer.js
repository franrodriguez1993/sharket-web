import TYPES_COMMENTS from "../types/commentTypes";

/** INITIAL STATES   **/
export const initialStates = {
  loading: false,
  errorFetch: "",
  comments: [],
  product: {},
  page: 0,
  currentPage: 1,
  totalPages: 1,
  modal: false,
  form: { body: "", product: "", user: "", reply: "", parent: false },
  errorForm: "",
};

/**  COMMENTS REDUCER   **/

export const commentReducer = (state, action) => {
  switch (action.type) {
    /** SET LOADING **/
    case TYPES_COMMENTS.setLoading:
      return { ...state, loading: true };

    /** SET ERROR FETCH**/
    case TYPES_COMMENTS.setErrorFetch:
      return { ...state, loading: false, errorFetch: action.payload };

    /** SET ERROR FORM **/
    case TYPES_COMMENTS.setErrorForm:
      return { ...state, errorForm: action.payload };

    /** SET COMMENTS **/
    case TYPES_COMMENTS.setComments:
      return {
        ...state,
        loading: false,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        comments: action.payload.comments,
        errorFetch: "",
      };

    /** SET BACK PAGE **/
    case TYPES_COMMENTS.backPage:
      return { ...state, page: state.page - 1 };

    /** SET NEXT PAGE **/
    case TYPES_COMMENTS.nextPage:
      return { ...state, page: state.page + 1 };

    /** SET PRODUCT **/
    case TYPES_COMMENTS.setProduct:
      return { ...state, product: action.payload };

    /** SET HANDLE CHANGE **/
    case TYPES_COMMENTS.handleChangeForm:
      return {
        ...state,
        form: { ...state.form, [action.payload.name]: action.payload.value },
      };

    /** OPEN MODAL **/
    case TYPES_COMMENTS.openModal:
      return {
        ...state,
        modal: true,
        form: {
          ...state.form,
          product: action.payload.product,
          user: action.payload.user,
          reply: action.payload.reply,
        },
      };

    /** CLOSE MODAL **/
    case TYPES_COMMENTS.closeModal:
      return {
        ...state,
        modal: false,
        form: initialStates.form,
        errorForm: "",
      };
    default:
      return state;
  }
};
