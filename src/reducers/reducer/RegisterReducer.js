import TYPES_REGISTER from "../types/RegisterTypes";

/**          INITIAL STATES          **/

export const initialStates = {
  form: {
    username: "",
    mail: "",
    password: "",
    repassword: "",
  },
  loading: false,
  errors: {},
  errorFetch: "",
  successMsg: "",
};

/**          FUNCTION REDUCER         **/

export const registerReducer = (state, action) => {
  switch (action.type) {
    /**  SET LOADING  **/
    case TYPES_REGISTER.setLoading:
      return { ...state, loading: true };

    /**  SET ERROR FETCH  **/
    case TYPES_REGISTER.setErrorFetch:
      return { ...state, errorFetch: action.payload, loading: false };

    /**  SET ERRORS:  **/
    case TYPES_REGISTER.setErrorForm:
      return { ...state, errors: action.payload, loading: false };

    /**  HANDLE CHANGE  **/
    case TYPES_REGISTER.handleChange:
      return {
        ...state,
        form: { ...state.form, [action.payload.name]: action.payload.value },
      };

    /**  SET LOADING OFF   **/
    case TYPES_REGISTER.setLoadingOff:
      return { ...state, loading: false };

    /**   SET SUCCESS MSG  **/
    case TYPES_REGISTER.setSuccessMsg:
      return {
        ...state,
        form: initialStates.form,
        loading: false,
        successMsg: action.payload,
      };
    default:
      return state;
  }
};
