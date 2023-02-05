import React from "react";
import cross from "../../svg/cross.svg";
const ModalImage = ({ img, closeModal }) => {
  return (
    <div className="ModalImage-container">
      <img src={cross} alt="cross" className="cross-svg" onClick={closeModal} />
      <img
        src={img || "/assets/img/default.jpg"}
        alt="image-modal"
        className="ModalImage-img"
      />
    </div>
  );
};

export default ModalImage;
