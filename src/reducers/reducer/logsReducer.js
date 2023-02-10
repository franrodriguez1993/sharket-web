import TYPES_LOGSROUTE from "../types/logsTypes";

/**    INITIAL STATES **/

export const initialStates = {
  loading: false,
  errorFetch: "",
  superusers: [],
  dataLogs: [],
  page: 0,
  currentPage: 1,
  totalPages: 0,
};

/**   FUNCTION REDUCER   **/

export const logsReducer = (state, action) => {
  switch (action.type) {
    /**  SET LOADING  **/
    case TYPES_LOGSROUTE.setLoading:
      return { ...state, loading: true };

    /**  SET ERROR FETCH  **/
    case TYPES_LOGSROUTE.setErrorFetch:
      return { ...state, errorFetch: action.payload, loading: false };

    /**  SET SUPERUSERS  **/
    case TYPES_LOGSROUTE.setSuperusers:
      return {
        ...state,
        superusers: action.payload.superusers,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        loading: false,
      };

    /**  SET LOGS  **/
    case TYPES_LOGSROUTE.setDataLogs:
      return {
        ...state,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        loading: false,
        dataLogs: action.payload.logs,
      };

    /**  SET PREVIOUS PAGE  **/
    case TYPES_LOGSROUTE.previewPage:
      return { ...state, page: state.page - 1 };

    /**  SET NEXT PAGE  **/
    case TYPES_LOGSROUTE.nextPage:
      return { ...state, page: state.page + 1 };
    default:
      return state;
  }
};
