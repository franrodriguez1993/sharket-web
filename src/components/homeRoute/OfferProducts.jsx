import React from "react";
import Loader from "../accesories/Loader";
import ProductsCard from "../accesories/ProductsCard";
const OfferProducts = ({ products, loading }) => {
  return (
    <section className="section-home">
      {loading ? (
        <Loader />
      ) : (
        <>
          {products.length !== 0 &&
            products.map((p) => (
              <ProductsCard key={p.product_id} product={p} />
            ))}
        </>
      )}
    </section>
  );
};

export default OfferProducts;
