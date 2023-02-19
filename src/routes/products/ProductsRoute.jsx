import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/ProductsRoute/ProductsRoute.css";
import { UserContext } from "../../context/UserProvider";
//Fetch:
import { URL_API } from "../../utils/URL";
import ManageFetch from "../../utils/manageFetch";
//Reducer:
import {
  productsReducer,
  initialStates,
} from "../../reducers/reducer/ProductsRouteReducer";
import TYPES_PRODUCTSROUTE from "../../reducers/types/ProductsRouteTypes";
//Components:
import SectionLoader from "../../components/accesories/SectionLoader";
import ProductsCard from "../../components/accesories/ProductsCard";

const ProductsRoute = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [states, dispatch] = useReducer(productsReducer, initialStates);
  const { products, page, loading, errorFetch, currentPage, totalPages } =
    states;
  const { FetchFunction } = ManageFetch();

  /** USE EFFECT **/
  useEffect(() => {
    window.scroll(0, 0);
    const url = `${URL_API}/product/list?size=20&page=${page}`;
    dispatch({ type: TYPES_PRODUCTSROUTE.setLoading });
    FetchFunction({ url }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: TYPES_PRODUCTSROUTE.setProducts, payload: res.data });
      }
    });
  }, [page]);
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
                  onClick={() =>
                    navigate(`/products/user/list/${user.user_id}`)
                  }
                >
                  My products
                </button>
                <button
                  className="pr-nav_btn--info"
                  onClick={() => navigate("/products/user/sales")}
                >
                  My sales
                </button>
                <button
                  className="pr-nav_btn--info"
                  onClick={() => navigate("/products/user/buys")}
                >
                  My buys
                </button>
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

      {/**  ERROR FETCH   **/}
      {errorFetch && (
        <div className="alert-error-container">
          <p className="text-error">{errorFetch}</p>
        </div>
      )}

      {/**  LOADING  **/}
      {loading && (
        <div className="modal-container">
          <SectionLoader />
        </div>
      )}

      {/**  NEWEST PRODUCTS  **/}
      <h3 className="productsRoute-subtitle">Newest products</h3>
      <div className="productRoute-cards_container">
        {products.length !== 0 &&
          products.map((p) => <ProductsCard key={p.product_id} product={p} />)}
      </div>

      {/**  PAGINATION  **/}
      <section className="pagination-section">
        {/*  BACK BUTTON */}
        {currentPage === 1 ? (
          <button className="button-disable">Back</button>
        ) : (
          <button
            className="button-blue"
            onClick={() => dispatch({ type: TYPES_PRODUCTSROUTE.previousPage })}
          >
            Back
          </button>
        )}

        {<b>{`${currentPage} of ${totalPages}`}</b>}

        {/*  NEXT BUTTON */}
        {currentPage < totalPages ? (
          <button
            className="button-blue"
            onClick={() => dispatch({ type: TYPES_PRODUCTSROUTE.nextPage })}
          >
            Next
          </button>
        ) : (
          <button className="button-disable">Next</button>
        )}
      </section>
    </div>
  );
};

export default ProductsRoute;
