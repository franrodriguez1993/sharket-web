import TYPES_PROFILEROUTE from "../types/profileTypes";

/**  INITIAL STATES    **/

export const initialStates = {
  loading: false,
  errorFetch: "",
  errorsForm: {},
  personalForm: { username: "", name: "", lastname: "", dni: "", phone: "" },
  mailForm: { mail: "" },
  passwordForm: { password: "", repassword: "" },
  imageForm: { preview: "", data: "" },
  birthdayForm: {
    day: 0,
    month: 0,
    year: 0,
  },
  addressesList: [],
  addressForm: {
    street: "",
    number: "",
    floor: "",
    apartment: "",
    city: "",
    state: "",
  },
};

/**  FUNCTION REDUCER    **/
export const profileReducer = (state, action) => {
  switch (action.type) {
    /**SET LOADING **/
    case TYPES_PROFILEROUTE.setloading:
      return { ...state, loading: true };

    /**SET ERROR FETCH **/
    case TYPES_PROFILEROUTE.setErrorFetch:
      return { ...state, loading: false, errorFetch: action.payload };

    /**SET ERROR FORM  **/
    case TYPES_PROFILEROUTE.setErrorsForm:
      return { ...state, errorsForm: action.payload };

    /**SET PERSONAL FORM DATA **/
    case TYPES_PROFILEROUTE.setPersonalForm:
      return { ...state, personalForm: action.payload };

    /** RESET ERRORS FORM   **/
    case TYPES_PROFILEROUTE.resetErrorsForm:
      return { ...state, errorsForm: initialStates.errorsForm };

    /**HANDLE CHANGE PERSONAL DATA FORM **/
    case TYPES_PROFILEROUTE.handleChangePersonalform:
      return {
        ...state,
        personalForm: {
          ...state.personalForm,
          [action.payload.name]: action.payload.value,
        },
      };

    /**HANDLE CHANGE MAIL FORM **/
    case TYPES_PROFILEROUTE.handleChangeMail:
      return {
        ...state,
        mailForm: {
          ...state.mailForm,
          [action.payload.name]: action.payload.value,
        },
      };

    /**HANDLE CHANGE PASSWORD FORM **/
    case TYPES_PROFILEROUTE.handleChangePassword:
      return {
        ...state,
        passwordForm: {
          ...state.passwordForm,
          [action.payload.name]: action.payload.value,
        },
      };

    /**HANDLE CHANGE IMAGE **/
    case TYPES_PROFILEROUTE.handleChangeImage:
      return { ...state, imageForm: action.payload };

    /**SET IMAGE  FORM**/
    case TYPES_PROFILEROUTE.setImageForm:
      return {
        ...state,
        imageForm: { ...state.imageForm, preview: action.payload },
      };

    /** HANDLE CHANGE BIRTHDAY**/
    case TYPES_PROFILEROUTE.handleChangeBirthday:
      return {
        ...state,
        birthdayForm: {
          ...state.birthdayForm,
          [action.payload.name]: action.payload.value,
        },
      };

    /** HANDLE CHANGE ADDRESS**/
    case TYPES_PROFILEROUTE.handleChangeAddress:
      return {
        ...state,
        addressForm: {
          ...state.addressForm,
          [action.payload.name]: action.payload.value,
        },
      };

    /** SET ADDRESSES LIST**/
    case TYPES_PROFILEROUTE.setAddresses:
      return { ...state, addressesList: action.payload };

    default:
      return state;
  }
};
