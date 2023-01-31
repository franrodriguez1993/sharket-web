/** ------ INITIAL STATE -------  **/

import { TYPES_SEARCHROUTE } from "../types/searchRouteType";

export const initialState = {
  results: [],
  quantity: 0,
  currentPage: 1,
  totalPages: 0,
  error: "",
  loading: false,
  categories: [],
  types: [],
  filteredTypes: [],
  params: {
    name: "",
    status: "",
    category: "",
    type: "",
    pmin: "",
    pmax: "",
    page: 0,
    size: 5,
  },
};

/** ------ REDUCER -------  **/
export const searchRouteReducer = (state, action) => {
  switch (action.type) {
    /** SEARCH RESULT **/
    case TYPES_SEARCHROUTE.searchResult:
      return {
        ...state,
        error: "",
        results: action.payload.products,
        quantity: action.payload.totalItems,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        loading: false,
      };

    /** SEARCH LOADING **/
    case TYPES_SEARCHROUTE.searchLoading:
      return { ...state, loading: true };

    /** SEARCH ERROR **/
    case TYPES_SEARCHROUTE.searchError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    /** SET CATEGORIES **/
    case TYPES_SEARCHROUTE.setCategories:
      return { ...state, categories: action.payload };

    /** SET TYPES **/
    case TYPES_SEARCHROUTE.setTypes:
      return { ...state, types: action.payload, filteredTypes: action.payload };

    /** FILTER TYPES **/
    case TYPES_SEARCHROUTE.filterTypes:
      return {
        ...state,
        filteredTypes: state.types.filter((t) => t.pc_id === action.payload),
      };
    /** RESET TYPES **/
    case TYPES_SEARCHROUTE.resetTypes:
      return { ...state, filteredTypes: state.types };

    /** ONCHANGE PARAMS  **/
    case TYPES_SEARCHROUTE.onChangeParams:
      return {
        ...state,
        params: {
          ...state.params,
          [action.payload.name]: action.payload.value,
        },
      };

    /** PREVIOUS PAGE **/
    case TYPES_SEARCHROUTE.previousPage:
      return {
        ...state,
        params: { ...state.params, page: state.params.page - 1 },
      };
    /** NEXT PAGE **/
    case TYPES_SEARCHROUTE.nextPage:
      return {
        ...state,
        params: { ...state.params, page: state.params.page + 1 },
      };
    default:
      return state;
  }
};
