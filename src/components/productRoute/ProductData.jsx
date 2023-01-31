import React, { useState } from "react";
import ModalImage from "./ModalImage";

const ProductData = ({ product }) => {
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState("");

  /**  Function to show modal **/
  const handleModalImg = (data) => {
    setDataModal(data);
    setModal(true);
  };
  /**  Function to close modal **/
  const closeModal = () => {
    setDataModal("");
    setModal(false);
  };
  return (
    <article className="productData-container">
      {/**  DATA PRODUCT AND IMAGE **/}
      <section className="productData-p_and_i">
        <div className="productData-container-img">
          <img src="/assets/img/default.jpg" alt="" />
        </div>
        <div className="productData-container-data">
          <h1>{product.product_name}</h1>
          <p>
            <b>Brand: </b> {product.product_brand || "---"}
          </p>
          <p>
            <b>Price: </b> $ {product.product_price}
          </p>
          <p>
            <b>Status: </b> {product.product_status}
          </p>
          <p>
            <b> Stock: </b>
            {product.product_stock >= 2
              ? `${product.product_stock} units`
              : "Last available"}
          </p>
          <p>
            <b>Units sold: </b> {product.product_sales}
          </p>
        </div>
      </section>

      {/**  PRODUCT DESCRIPTION **/}

      <section className="productData-description">
        <b>Warranty </b>
        <p>{product.product_warranty || "---"} months</p>
        <b>Description</b>
        <p>{product.product_description}</p>
      </section>

      {/**  MORE PRODUCT IMAGES **/}
      {product.image_products.length !== 0 && (
        <>
          <b>More images</b>
          <section className="productData-moreImage">
            {product.image_products.map((i) => (
              <img
                src="/assets/img/default.jpg"
                alt="image-product"
                key={i.ip_id}
                onClick={() => handleModalImg(i.ip_path)}
              />
            ))}
          </section>
          {/** Modal to see the image **/}
          {modal && <ModalImage img={dataModal} closeModal={closeModal} />}
        </>
      )}
    </article>
  );
};

export default ProductData;
