import TYPES_SUPERUSER from "../types/superuserTypes";

/**        INITIALS STATES          **/

export const initialStates = {
  loading: false,
  errorFetch: "",
  successMsg: "",
  search: "",
  usertarget: {},
};

export const superuserReducer = (state, action) => {
  switch (action.type) {
    /** SET LOADING  **/
    case TYPES_SUPERUSER.setLoading:
      return { ...state, loading: true };

    /**  SET ERROR FETCH  **/
    case TYPES_SUPERUSER.setErrorFetch:
      return {
        ...state,
        loading: false,
        errorFetch: action.payload,
        successMsg: initialStates.successMsg,
      };

    /**  SET USER TARGET   **/
    case TYPES_SUPERUSER.setusertarget:
      return {
        ...state,
        loading: false,
        errorFetch: "",
        search: initialStates.search,
        usertarget: action.payload,
      };

    /**  HANDLE CHANGE SEARCH   **/
    case TYPES_SUPERUSER.handleChangeSearch:
      return { ...state, search: action.payload };

    /**  RESET USER TARGET   **/
    case TYPES_SUPERUSER.resetusertarget:
      return {
        ...state,
        usertarget: initialStates.usertarget,
        successMsg: initialStates.successMsg,
      };

    /** SET SUCCESS MSG  **/
    case TYPES_SUPERUSER.setSuccessMsg:
      return {
        ...state,
        successMsg: action.payload,
        errorFetch: initialStates.errorFetch,
        loading: false,
      };

    /** RESET SUCCESS MSG  **/
    case TYPES_SUPERUSER.resetSuccessMsg:
      return {
        ...state,
        successMsg: initialStates.successMsg,
      };
    default:
      return state;
  }
};
