import React from "react";
import TYPES_SELLPRODUCTS from "../../reducers/types/sellProductsTypes";

const DescImagesForm = ({
  images,
  descriptionImage,
  dispatch,
  handleDescrImgChange,
  handleUploadDescImg,
  handleDelDescrImg,
}) => {
  return (
    <div className="container-cards-small">
      <h3 className="title">Description Images</h3>
      {/** DESCRIPTION IMAGES  **/}
      {images.length === 0 ? (
        <div>
          <p>There are no description images yet.</p>
        </div>
      ) : (
        <div className="container-flex-around ">
          {images.map((i) => (
            <article key={i.ip_id} className="card-img_desc">
              <img
                src={i.ip_path}
                alt="img-description"
                className="img-description"
              />
              <button
                className="button-no"
                onClick={(e) => handleDelDescrImg(e, i.ip_id)}
              >
                Delete
              </button>
            </article>
          ))}
        </div>
      )}

      <label htmlFor="image" className="sellForm-label">
        Product image:
      </label>
      {descriptionImage.preview && (
        <div className="desc-img_container">
          <img
            src={descriptionImage.preview}
            alt="product-preview"
            className="desc-img_img"
          />
        </div>
      )}
      <input
        type="file"
        name="product"
        id="image"
        accept="image/*"
        formEncType="multipart/form-data"
        onChange={handleDescrImgChange}
      />
      <button className="button-blue" onClick={(e) => handleUploadDescImg(e)}>
        Upload
      </button>
      <button
        className="button-warn"
        onClick={() => dispatch({ type: TYPES_SELLPRODUCTS.resetImgDescrFile })}
      >
        cancel
      </button>
    </div>
  );
};

export default DescImagesForm;
