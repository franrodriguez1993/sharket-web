import TYPES_FAVORITES from "../types/favoritesTypes";

/**    ----  INITIAL STATES  ----    **/
export const initialStates = {
  loading: false,
  errorFetch: "",
  favorites: [],
  page: 0,
  currentPage: 1,
  totalPages: 1,
};

/**    ----  REDUCER  ----    **/

export const favoritesReducer = (state, action) => {
  switch (action.type) {
    /**  SET LOADING   **/
    case TYPES_FAVORITES.setLoading:
      return { ...state, loading: true };

    /**  SET ERROR FETCH   **/
    case TYPES_FAVORITES.setErrorFetch:
      return { ...state, loading: false, errorFetch: action.payload };

    /**  SET FAVORITES   **/
    case TYPES_FAVORITES.setFavorites:
      return {
        ...state,
        loading: false,
        errorFetch: "",
        favorites: action.payload.products,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };

    /**  PREVIOUS PAGE   **/
    case TYPES_FAVORITES.backPage:
      return { ...state, page: state.page - 1 };

    /**  NEXT PAGE   **/
    case TYPES_FAVORITES.nextPage:
      return { ...state, page: state.page + 1 };

    default:
      return state;
  }
};
