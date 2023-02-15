import React from "react";
import "../../css/accesories/Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      {/**  LOGO  **/}
      <div className="footer-logo">
        <img
          src="/assets/img/Sharknet2.png"
          alt="logo"
          className="footer-img"
        />
      </div>
      {/**  COPYRIGHT  **/}
      <div className="footer-copyright">
        <b className="footer-text"> © 2000-2023 Sharknet.com </b>
      </div>
      {/**  OPTIONS  **/}
      <div className="footer-conditions">
        <b>Conditions of use</b>
        <b>Privacy Notice</b>
        <b>Help</b>
      </div>
    </div>
  );
};

export default Footer;
