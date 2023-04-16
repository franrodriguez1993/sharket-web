import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/CartRoute/CartRoute.css";
//Context:
import { CartContext } from "../../context/CartProvider";
import { UserContext } from "../../context/UserProvider";
//Fetch:
import ManageFetch from "../../utils/manageFetch";
import { URL_API } from "../../utils/URL";
//Reducers:
import TYPES_CART from "../../reducers/types/cartTypes";
//Components:
import CartCard from "../../components/CartRoute/CartCard";
import CartForm from "../../components/CartRoute/CartForm";
import ModalErrorBuy from "../../components/CartRoute/ModalErrorBuy";
import ModalSuccessBuy from "../../components/CartRoute/ModalSuccessBuy";
import SectionLoader from "../../components/accesories/SectionLoader";

const CartRoute = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    form,
    dispatch,
    errorForm,
    loading,
    modalSuccess,
    modalError,
  } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const { FetchFunction } = ManageFetch();
  const [totalPrice, setTotalPrice] = useState(0);

  /** USE EFFECT  **/
  useEffect(() => {
    if (cart.length !== 0) {
      getPrice(cart);

      //Set initialState form:
      const products = cart.map((c) => {
        return { pid: c.pid, uid: c.uid, quantity: c.quantity };
      });
      dispatch({
        type: TYPES_CART.setForm,
        payload: {
          buyer: user.user_id,
          products,
          sale_instalments: 0,
        },
      });
    }
  }, [cart]);

  /** GET PRICE   **/
  function getPrice(cart) {
    const arrayPrices = cart.map((i) =>
      i.product.product_offer !== 0
        ? (i.product.product_price *
            i.quantity *
            (100 - i.product.product_offer)) /
          100
        : i.product.product_price * i.quantity
    );
    const tp = arrayPrices.reduce((a, b) => a + b);
    setTotalPrice(tp);
  }

  /** HANDLE CHANGE FORM  **/
  const handleChangeForm = (e) => {
    dispatch({ type: TYPES_CART.handleChangeForm, payload: e.target });
  };

  /** HANDLE SUBMIT BUY  **/
  const handleSubmitBuy = () => {
    //buy:
    dispatch({ type: TYPES_CART.setLoading });
    const url = `${URL_API}/product/sale/buy`;
    FetchFunction({ url, method: "POST", body: form }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: TYPES_CART.setModalSuccess });
      } else {
        dispatch({ type: TYPES_CART.setModalError });
      }
    });
  };

  return (
    <>
      <div className="routeContainer">
        <h1 className="title">Cart</h1>

        {/**  LOADING  **/}
        {loading && (
          <div className="modal-container">
            <SectionLoader />
          </div>
        )}
        {cart.length !== 0 ? (
          <>
            <div className="carRoute_body">
              {/** ARRAY CARDS **/}
              <section className="cartSection">
                {cart.map((c) => (
                  <CartCard
                    key={c.pid}
                    cart={c}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </section>

              {/** BUY SECTION **/}
              <section className="buySection">
                <hr className="cartroute-hr" />
                <h4 className="fw-bolder m-3">Buy</h4>
                <p>
                  <b>Total Price: </b>${totalPrice}
                </p>

                <CartForm
                  handleChangeForm={handleChangeForm}
                  form={form}
                  user={user}
                  handleSubmitBuy={handleSubmitBuy}
                  errorForm={errorForm}
                />
              </section>
            </div>
          </>
        ) : (
          <>
            <div className="container-lg m-5 d-flex flex-column align-items-center">
              <b>You don't have any product in your cart</b>
              <button
                className="button-blue"
                onClick={() => navigate("/products")}
              >
                Go to products
              </button>
            </div>
          </>
        )}
      </div>

      {/**  MODALS   **/}

      {modalError && <ModalErrorBuy dispatch={dispatch} />}

      {modalSuccess && <ModalSuccessBuy dispatch={dispatch} />}
    </>
  );
};

export default CartRoute;
