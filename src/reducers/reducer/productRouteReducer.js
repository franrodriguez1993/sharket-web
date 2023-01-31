import TYPES_PRODUCTROUTE from "../types/productRouteTypes";
/**  ---------- INITIAL STATE ----------  **/

export const initialState = {
  product: {},
  loadingProduct: false,
  loadingComments: false,
  loadingSimilarProducts: false,
  loadingReputationSeller: false,
  error: "",
  comments: [],
  commentTotalPage: 1,
  commentCurrentPage: 1,
  commentPage: 0,
  similarProducts: [],
  reputationSeller: [],
};

/**  ---------- REDUCER ----------  **/

export const productRouteReducer = (state, action) => {
  switch (action.type) {
    /** PRODUCT DATA **/
    case TYPES_PRODUCTROUTE.productData:
      return {
        ...state,
        error: "",
        loadingProduct: false,
        product: action.payload,
      };
    /** LOADING PRODUCT**/
    case TYPES_PRODUCTROUTE.loadingProduct:
      return { ...state, loadingProduct: true };
    /** ERROR **/
    case TYPES_PRODUCTROUTE.error:
      return {
        ...state,
        error: action.payload,
        loadingProduct: false,
        loadingComments: false,
        loadingSimilarProducts: false,
      };
    /** COMMENTS DATA **/
    case TYPES_PRODUCTROUTE.commentsData:
      return {
        ...state,
        comments: action.payload.comments,
        loadingComments: false,
        commentCurrentPage: action.payload.currentPage,
        commentTotalPage: action.payload.totalPages,
      };
    /** LOADING COMMENTS **/
    case TYPES_PRODUCTROUTE.loadingComments:
      return { ...state, loadingComments: true };

    /** BACK PAGE - COMMENT  **/
    case TYPES_PRODUCTROUTE.backPageComment:
      return { ...state, commentPage: state.commentPage - 1 };

    /** BACK PAGE - COMMENT  **/
    case TYPES_PRODUCTROUTE.nextPageComment:
      return { ...state, commentPage: state.commentPage + 1 };

    /** SIMILAR PRODUCTS - DATA  **/
    case TYPES_PRODUCTROUTE.similarProductsData:
      return {
        ...state,
        similarProducts: action.payload,
        loadingSimilarProducts: false,
      };

    /** LOADING SIMILAR PRODUCTS **/
    case TYPES_PRODUCTROUTE.loadingSimilarProducts:
      return { ...state, loadingSimilarProducts: true };

    /** REPUTATION SELLER DATA **/
    case TYPES_PRODUCTROUTE.reputationsSellerData:
      return {
        ...state,
        reputationSeller: action.payload,
        loadingReputationSeller: false,
      };

    /** LOADING REPUTATION SELLER **/
    case TYPES_PRODUCTROUTE.loadingReputationSeller:
      return { ...state, loadingReputationSeller: true };
    default:
      return state;
  }
};
