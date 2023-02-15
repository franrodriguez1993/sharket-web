import TYPES_HOME from "../types/homeTypes";

/**   INITIAL STATES  **/

export const initialStates = {
  loadingOffer: false,
  offerProducts: [],
  loadingLatest: false,
  LatestProducts: [],
  loadingGamer: false,
  gamerProducts: [],
};

/**   REDUCER   **/

export const homeReducer = (state, action) => {
  switch (action.type) {
    /** LOADING LATEST**/
    case TYPES_HOME.setLoadingLatest:
      return { ...state, loadingLatest: true };

    /** SET LATEST**/
    case TYPES_HOME.setLatestProducts:
      return {
        ...state,
        loadingLatest: false,
        LatestProducts: action.payload,
      };

    /** LOADING OFFERS**/
    case TYPES_HOME.setLoadingOffer:
      return { ...state, loadingOffer: true };

    /** SET OFFERS**/
    case TYPES_HOME.setOfferProducts:
      return {
        ...state,
        loadingOffer: false,
        offerProducts: action.payload,
      };

    /** LOADING GAMER**/
    case TYPES_HOME.setLoadingGamer:
      return { ...state, loadingGamer: true };

    /** SET GAMER PRODUCTS **/
    case TYPES_HOME.setGamerProducts:
      return { ...state, gamerProducts: action.payload, loadingGamer: false };
    default:
      return state;
  }
};
