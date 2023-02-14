import TYPES_CART from "../types/cartTypes";

/**  INITIALSTATES  **/
export const initialStates = {
  cart: [],
  form: { buyer: "", products: [], creditCard: "", instalments: 0 },
  errorForm: "",
  loading: false,
  modalSuccess: false,
  modalError: false,
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    /** ADD NEW PRODUCT  **/
    case TYPES_CART.addProduct:
      return { ...state, cart: [...state.cart, action.payload] };

    /** UPDATE PRODUCT QUANTITY **/
    case TYPES_CART.updateProductQuantity:
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.pid === action.payload.pid
            ? { ...i, quantity: i.quantity + action.payload.quantity }
            : i
        ),
      };

    /** REMOVE FROM CART  **/
    case TYPES_CART.removeFromCart:
      return {
        ...state,
        cart: state.cart.filter((i) => i.pid !== action.payload),
      };

    /** CLEAN CART **/
    case TYPES_CART.cleanCart:
      return { ...state, cart: initialStates.cart };

    /** SET FORM: **/
    case TYPES_CART.setForm:
      return { ...state, form: action.payload };

    /** RESET FORM: **/
    case TYPES_CART.resetForm:
      return { ...state, form: initialStates.form };

    /** HANDLE CHANGE FORM: **/
    case TYPES_CART.handleChangeForm:
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.name]: action.payload.value,
        },
        errorForm: "",
      };

    /** ERROR FORM **/
    case TYPES_CART.errorForm:
      return { ...state, errorForm: action.payload };

    /** SET LOADING **/
    case TYPES_CART.setLoading:
      return { ...state, loading: true };

    /** SET MODAL SUCCESS **/
    case TYPES_CART.setModalSuccess:
      return {
        ...state,
        form: initialStates.form,
        loading: false,
        modalSuccess: true,
      };

    /** SET MODAL ERROR **/
    case TYPES_CART.setModalError:
      return { ...state, loading: false, modalError: true };

    /** RESET MODALS **/
    case TYPES_CART.resetModals:
      return { ...state, modalError: false, modalSuccess: false };
    default:
      return state;
  }
};
