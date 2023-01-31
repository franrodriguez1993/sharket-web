import React from "react";
import ProductsCard from "../accesories/ProductsCard";

const SimilarProducts = ({ products }) => {
  return (
    <div className="similarProducts-container">
      <h3 className="similarProducts-title">Similar products</h3>

      <section className="productCards-container">
        {products.map((p) => (
          <ProductsCard key={p.product_id} product={p} />
        ))}
      </section>
    </div>
  );
};

export default SimilarProducts;
