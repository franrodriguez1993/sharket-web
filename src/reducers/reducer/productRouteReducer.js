import TYPES_PRODUCTROUTE from "../types/productRouteTypes";
/**  ---------- INITIAL STATE ----------  **/

export const initialState = {
  product: {},
  loadingProduct: false,
  loadingComments: false,
  loadingSimilarProducts: false,
  loadingFavOperation: false,
  error: "",
  comments: [],
  commentTotalPage: 1,
  commentCurrentPage: 1,
  commentPage: 0,
  similarProducts: [],
  sellerProducts: [],
  favorites: [],
  formComment: {
    product: "",
    user: "",
    body: "",
    reply: null,
    parent: true,
  },
  formError: "",
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

    /**  SELLER PRODUCTS DATA **/
    case TYPES_PRODUCTROUTE.sellerProductsData:
      return { ...state, sellerProducts: action.payload };

    /** FAVORITES **/
    case TYPES_PRODUCTROUTE.setFavorites:
      return {
        ...state,
        loadingFavOperation: false,
        favorites: action.payload,
      };
    /**  LOADING FAV OPERATION **/
    case TYPES_PRODUCTROUTE.loadingFavOperation:
      return { ...state, loadingFavOperation: true };

    /**  ADD NEW FAVORITE **/
    case TYPES_PRODUCTROUTE.addNewFavorite:
      return {
        ...state,
        loadingFavOperation: false,
        favorites: [...state.favorites, { product_id: action.payload }],
      };

    /**  REMOVE FAVORITE **/
    case TYPES_PRODUCTROUTE.removeOneFavorite:
      return {
        ...state,
        loadingFavOperation: false,
        favorites: state.favorites.filter(
          (i) => i.product_id != action.payload
        ),
      };

    /** HANDLE CHANGE COMMENT**/
    case TYPES_PRODUCTROUTE.handleChangeComment:
      return {
        ...state,
        formComment: {
          ...state.formComment,
          [action.payload.name]: action.payload.value,
        },
      };

    /** ADD NEW COMMENT **/
    case TYPES_PRODUCTROUTE.addNewComment:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
        loadingProduct: false,
        formError: "",
        formComment: initialState.formComment,
      };

    /** ERROR FORM COMMENT **/
    case TYPES_PRODUCTROUTE.errorFormComment:
      return { ...state, formError: action.payload, loadingProduct: false };
    default:
      return state;
  }
};
