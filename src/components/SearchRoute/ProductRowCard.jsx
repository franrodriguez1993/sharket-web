import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/SearchRoute/ProductRowCard.css";

const ProductRowCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <tr
      className="productRow-card"
      onClick={() => navigate(`/product/${product.product_id}`)}
    >
      <td className="productRow-td">
        {product.product_thumbnail ? (
          <img
            src={product.product_thumbnail}
            alt="product-image"
            className="productRow-img"
          />
        ) : (
          <img
            src="/assets/img/default.jpg"
            alt="product-image"
            className="productRow-img"
          />
        )}
      </td>
      <td className="productRow-td">{product.product_name}</td>
      <td className="productRow-td">{product.product_brand}</td>
      <td className="productRow-td">$ {product.product_price}</td>
      <td className="productRow-td">{product.product_status}</td>
    </tr>
  );
};

export default ProductRowCard;
