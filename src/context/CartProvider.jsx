import React, { createContext, useReducer } from "react";
//Reducer:
import { CartReducer, initialStates } from "../reducers/reducer/cartReducer";
import TYPES_CART from "../reducers/types/cartTypes";

const CartContext = createContext();

const CartProvider = (props) => {
  const [states, dispatch] = useReducer(CartReducer, initialStates);
  const { cart, form, errorForm, loading, modalSuccess, modalError } = states;

  function addToCart(data) {
    if (cart.length !== 0) {
      const checkProduct = cart.find((i) => i.product.product_id === data.pid);
      if (checkProduct) {
        dispatch({
          type: TYPES_CART.updateProductQuantity,
          payload: data,
        });
      } else {
        dispatch({
          type: TYPES_CART.addProduct,
          payload: data,
        });
      }
    } else {
      dispatch({
        type: TYPES_CART.addProduct,
        payload: data,
      });
    }
  }
  function removeFromCart(pid) {
    dispatch({ type: TYPES_CART.removeFromCart, payload: pid });
  }

  function cleanCart() {
    dispatch({ type: TYPES_CART.cleanCart });
  }
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        cleanCart,
        form,
        dispatch,
        errorForm,
        loading,
        modalSuccess,
        modalError,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
export { CartContext };
export default CartProvider;
