import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//SVG:
import verified from "../../svg/verified.svg";
import { CartContext } from "../../context/CartProvider";
import ModalAddedCart from "./ModalAddedCart";

const SellerData = ({ seller, address, user, product }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [cartModal, setCartModal] = useState(false); //product success added
  const [limit, setLimit] = useState(product.product_stock);
  const { addToCart, cart } = useContext(CartContext);

  /** HANDLE LIMIT  **/
  useEffect(() => {
    if (cart.length !== 0) {
      const productCart = cart.find((i) => i.pid === product.product_id);
      if (productCart) {
        setLimit(product.product_stock - productCart.quantity);
      }
    }
  }, [cart]);

  /**  ADD QUANTITY - BUTTON **/
  const addQuantity = () => {
    if (quantity < limit) {
      setQuantity(quantity + 1);
    }
  };
  /**  REMOVE QUANTITY - BUTTON **/
  const removeQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  /**  ADD TO CART **/
  const handleAddToCart = () => {
    const body = {
      product,
      pid: product.product_id,
      uid: product.user.user_id,
      quantity,
    };
    addToCart(body);
    setQuantity(1);
    //Modal success:
    successAddedToCart();
  };

  /**  MODAL SUCCESS ADDED TO CART **/
  function successAddedToCart() {
    setCartModal(true);
    setTimeout(() => {
      setCartModal(false);
    }, 1000);
  }

  return (
    <>
      <article className="sellerData-container">
        <div>
          {seller.user_image ? (
            <img
              src={seller.user_image}
              alt="user-img"
              className="seller-img"
            />
          ) : (
            <img
              src="/assets/img/userDefault.png"
              alt="user-img"
              className="seller-img"
            />
          )}
          {seller.Rol.rol_name === "store" && (
            <img src={verified} alt="verified-user" className="verified-img" />
          )}
        </div>
        <h5 className="sellerData-username">{seller.user_username}</h5>
        <hr className="sellderData-hr" />
        <b>Address</b>
        <p className="sellerData-address">
          {address.address_state} - {address.address_city}
        </p>
        <hr className="sellderData-hr" />

        {/**  BUY SECTION **/}
        {user ? (
          <>
            {user.Rol.rol_name === "user" &&
              seller.user_id !== user.user_id &&
              product.product_condition === "active" && (
                <>
                  <b className="m-3">Buy product</b>
                  <div>
                    <input
                      type="number"
                      className="sellerdata-quantity_input"
                      min={1}
                      max={product.product_stock}
                      onChange={(e) => setQuantity(e.target.value)}
                      value={quantity}
                    />
                    <button
                      onClick={removeQuantity}
                      className="sellerdata-quantity_button"
                    >
                      -
                    </button>
                    <button
                      onClick={addQuantity}
                      className="sellerdata-quantity_button"
                    >
                      +
                    </button>
                    <div>
                      <button
                        className={` ${
                          quantity <= limit ? "button-blue" : "button-disable"
                        }`}
                        onClick={() => {
                          if (quantity <= limit) {
                            handleAddToCart();
                          }
                        }}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </>
              )}
          </>
        ) : (
          <>
            <button className="button-blue" onClick={() => navigate("/login")}>
              Add to cart
            </button>
          </>
        )}
      </article>

      {/** MODAL SUCCESS ADDED CART**/}
      {cartModal && <ModalAddedCart />}
    </>
  );
};

export default React.memo(SellerData);
