import React from "react";
import { useNavigate } from "react-router-dom";
const ProductCardOptions = ({
  product,
  pauseProduct,
  reactivateProduct,
  deleteProduct,
}) => {
  const navigate = useNavigate();
  return (
    <article className="pco-card">
      <div className="pco-img_container">
        {product.product_thumbnail ? (
          <img
            src={product.product_thumbnail}
            alt="img-product"
            className="pco-img"
          />
        ) : (
          <img
            src="/assets/img/default.jpg"
            alt="img-product"
            className="pco-img"
          />
        )}
      </div>
      <div className="pco-data_container">
        <b>{product.product_name}</b>
        <p>{product.product_brand}</p>
        <p>$ {product.product_price}</p>
        <p>
          <b>Product status: </b> {product.product_condition}
        </p>
      </div>
      <div className="pco-options_container">
        <button
          className="button-blue"
          onClick={() => navigate(`/products/edit/${product.product_id}`)}
        >
          Edit
        </button>
        {product.product_condition === "active" ? (
          <button
            className="button-blue"
            onClick={(e) => pauseProduct(e, product.product_id)}
          >
            Pause
          </button>
        ) : (
          <button
            className="button-blue"
            onClick={(e) => reactivateProduct(e, product.product_id)}
          >
            Reactivate
          </button>
        )}
        <button
          className="button-blue"
          onClick={(e) => deleteProduct(e, product.product_id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default ProductCardOptions;
