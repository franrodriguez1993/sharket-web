import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/accesories/ProductCard.css";

const ProductsCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.product_id}`);
  };
  return (
    <article className="productCard" onClick={handleClick}>
      <h5 className="productCard-name">{product.product_name}</h5>
      <img
        src="/assets/img/default.jpg"
        alt="product-image"
        className="productCard-img"
      />
      <p className="productCard-price">
        <b>Price: $</b>
        {product.product_price}
      </p>
      <p className="productCard-price">
        <b>Status: </b>
        {product.product_status}
      </p>
    </article>
  );
};

export default ProductsCard;
