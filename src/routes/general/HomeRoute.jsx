import React from "react";
import "../../css/homeRoute/HomeRoute.css";
import Carrousel from "../../components/homeRoute/Carrousel";

const HomeRoute = () => {
  return (
    <div className="routeContainer">
      <section className="homeRoute-presentation">
        <Carrousel />
      </section>
    </div>
  );
};

export default HomeRoute;
