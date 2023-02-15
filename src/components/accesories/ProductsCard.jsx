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
      {/** PRODUCT IMG **/}
      {product.product_thumbnail ? (
        <img
          src={product.product_thumbnail}
          alt="product-image"
          className="productCard-img"
        />
      ) : (
        <img
          src="/assets/img/default.jpg"
          alt="product-image"
          className="productCard-img"
        />
      )}
      <div className="productCard-container_desc">
        {product.product_offer !== 0 ? (
          <>
            <p className="text-success">
              <b>Price: </b> ${" "}
              {(product.product_price * (100 - product.product_offer)) / 100} (
              <i className="text-success">{product.product_offer} % off</i>)
            </p>
          </>
        ) : (
          <p>
            <b>Price: </b> $ {product.product_price}
          </p>
        )}
        <p className="productCard-price">
          <b>Status: </b>
          {product.product_status}
        </p>
      </div>
    </article>
  );
};

export default ProductsCard;
