import React from "react";
import ProductsCard from "../accesories/ProductsCard";

const SellerProducts = ({ products, seller }) => {
  return (
    <div className="sellerProducts-container">
      <h3 className="sellerProducts-title">More {seller} products: </h3>
      <section className="productCards-container">
        {products.map((p) => (
          <ProductsCard key={p.product_id} product={p} />
        ))}
      </section>
    </div>
  );
};

export default SellerProducts;
