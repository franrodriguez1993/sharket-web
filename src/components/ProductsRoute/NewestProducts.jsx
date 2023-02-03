import React from "react";
import ProductsCard from "../accesories/ProductsCard";

const NewestProducts = ({ products }) => {
  return (
    <section className="productsRoute-newest">
      {products.map((p) => (
        <ProductsCard key={p.product_id} product={p} />
      ))}
    </section>
  );
};

export default NewestProducts;
