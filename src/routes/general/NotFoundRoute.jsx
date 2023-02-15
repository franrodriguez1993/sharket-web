import React from "react";
import "../../css/NotFoundRoute/NotFoundRoute.css";

const NotFoundRoute = () => {
  return (
    <div className="routeContainer">
      <article className="containerError">
        <img
          src="/assets/img/errorShark.png"
          alt="error"
          className="notfound-img"
        />
        <h3>Error 404: Page not found.</h3>
      </article>
    </div>
  );
};

export default NotFoundRoute;
