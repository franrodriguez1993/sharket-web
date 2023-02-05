import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/ProductsRoute/ProductsRoute.css";
import { UserContext } from "../../context/UserProvider";
//Fetch:
import { URL_API } from "../../utils/URL";
import ManageFetch from "../../utils/manageFetch";

//Components:
import SectionLoader from "../../components/accesories/SectionLoader";
import NewestProducts from "../../components/ProductsRoute/NewestProducts";

const ProductsRoute = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [newest, setNewest] = useState([]);

  const { FetchFunction } = ManageFetch();

  /** USE EFFECT **/
  useEffect(() => {
    const url = `${URL_API}/product/list?size=6`;

    FetchFunction({ url }).then((res) => {
      if (!res) return;
      if (res.status === 200) {
        setNewest(res.data.products);
      }
    });
  }, []);
  return (
    <div className="routeContainer">
      {/**  NAVBAR PARA USERS **/}
      {user && (
        <>
          {(user.Rol.rol_name === "user" || user.Rol.rol_name === "store") && (
            <nav className="ProductsRoute-nav">
              <div className="ProductsRoute-nav_info">
                <button
                  className="pr-nav_btn--info"
                  onClick={() => navigate(`/products/user/${user.user_id}`)}
                >
                  My products
                </button>
                <button className="pr-nav_btn--info">View sells</button>
                <button className="pr-nav_btn--info">View Buys</button>
              </div>
              <div className="ProductsRoute-nav_new">
                <button
                  className="pr-nav_btn--new"
                  onClick={() => navigate("/products/publish")}
                >
                  Publish new
                </button>
              </div>
            </nav>
          )}
        </>
      )}

      {/**  NEWEST PRODUCTS  **/}
      <h3 className="productsRoute-subtitle">Newest products</h3>
      {newest.length !== 0 ? (
        <>
          <NewestProducts products={newest} />
        </>
      ) : (
        <>
          <SectionLoader />
        </>
      )}
    </div>
  );
};

export default ProductsRoute;
