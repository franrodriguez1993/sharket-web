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
      <div className="productCard-container_name">
        <h5 className="productCard-name">{product.product_name}</h5>
      </div>
      <img
        src="/assets/img/default.jpg"
        alt="product-image"
        className="productCard-img"
      />
      <div className="productCard-container_desc">
        <p className="productCard-price">
          <b>Price: $</b>
          {product.product_price}
        </p>
        <p className="productCard-price">
          <b>Status: </b>
          {product.product_status}
        </p>
      </div>
    </article>
  );
};

export default ProductsCard;
