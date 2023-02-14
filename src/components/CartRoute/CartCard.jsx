import React from "react";
import "../../css/CartRoute/CartCard.css";
import { useNavigate } from "react-router-dom";

const CartCard = ({ cart, removeFromCart }) => {
  const navigate = useNavigate();

  return (
    <div className="cartcard">
      <div className="cartcard-product">
        <img
          src={cart.product.product_thumbnail || "/assets/img/default.jpg"}
          alt="product"
          className="cartcard-img"
        />
        <p>
          <b>{cart.product.product_name}</b>
        </p>
        <p>
          <b>Units: </b> {cart.quantity}
        </p>

        <p>
          <b>Amount: </b>$
          {cart.product.product_offer === 0
            ? cart.product.product_price * cart.quantity
            : (cart.product.product_price *
                cart.quantity *
                (100 - cart.product.product_offer)) /
              100}
        </p>
      </div>
      <div className="cartcard-quantity">
        <button
          className="button-blue mt-0"
          onClick={() => navigate(`/product/${cart.pid}`)}
        >
          Go to product
        </button>
        <button
          className="button-warn mt-0"
          onClick={() => removeFromCart(cart.pid)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartCard;
