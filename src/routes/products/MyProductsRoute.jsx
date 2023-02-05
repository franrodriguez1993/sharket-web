import React, { useReducer, useEffect } from "react";
import "../../css/ProductsRoute/MyProductsRoute.css";
import { useParams } from "react-router-dom";
//Fetch:
import { URL_API } from "../../utils/URL";
import ManageFetch from "../../utils/manageFetch";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Reducers:
import {
  initialStates,
  myProductsReducer,
} from "../../reducers/reducer/myProductsRouteReducer";
import TYPES_MYPRODUCTS from "../../reducers/types/myProductsRouteTypes";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Components:
import ProductCardOptions from "../../components/ProductsRoute/ProductCardOptions";
import SectionLoader from "../../components/accesories/SectionLoader";

const MyProductsRoute = () => {
  const { id } = useParams();
  const { FetchFunction } = ManageFetch();
  const [productsStates, dispatch] = useReducer(
    myProductsReducer,
    initialStates
  );
  const { products, loading, errors, page, totalPage, currentPage } =
    productsStates;

  /**  ---------- USE EFFECT ----------  **/
  useEffect(() => {
    const url = `${URL_API}/product/list/user/${id}?size=5&page=${page}`;
    dispatch({ type: TYPES_MYPRODUCTS.loading });
    FetchFunction({ url }).then((res) => {
      if (!res) return;
      else if (res.status === 200) {
        dispatch({ type: TYPES_MYPRODUCTS.setProducts, payload: res.data });
      }
    });
  }, [id, page]);

  /**  ---------- PAUSE PRODUCT ----------  **/
  const pauseProduct = (e, product) => {
    e.preventDefault();
    const url = `${URL_API}/product/condition/pause/${product}`;
    dispatch({ type: TYPES_MYPRODUCTS.loading });
    FetchFunction({ url, method: "PUT" }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: TYPES_MYPRODUCTS.pauseProduct, payload: product });
      } else {
        dispatch({ type: TYPES_MYPRODUCTS.errors, payload: "Server error." });
      }
    });
  };

  /**  ---------- REACTIVATE PRODUCT ----------  **/
  const reactivateProduct = (e, product) => {
    e.preventDefault();
    const url = `${URL_API}/product/condition/reactivate/${product}`;
    dispatch({ type: TYPES_MYPRODUCTS.loading });
    FetchFunction({ url, method: "PUT" }).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: TYPES_MYPRODUCTS.reactivateProduct,
          payload: product,
        });
      } else {
        dispatch({ type: TYPES_MYPRODUCTS.errors, payload: "Server error." });
      }
    });
  };

  /**  ---------- DELETE PRODUCT ----------  **/
  const deleteProduct = (e, product) => {
    e.preventDefault();
    const url = `${URL_API}/product/condition/delete/${product}`;
    dispatch({ type: TYPES_MYPRODUCTS.loading });
    FetchFunction({ url, method: "DELETE" }).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: TYPES_MYPRODUCTS.deleteProduct,
          payload: product,
        });
      } else {
        dispatch({ type: TYPES_MYPRODUCTS.errors, payload: "Server error." });
      }
    });
  };

  return (
    <div className="routeContainer">
      <h1 className="title">My products</h1>
      <section className="container-cards_row">
        {errors && (
          <div className="alert-error-container">
            <h4 className="text-error">{errors}</h4>
          </div>
        )}
        {loading ? (
          <div>
            <SectionLoader />
          </div>
        ) : (
          <>
            {products.length !== 0 ? (
              <>
                {products.map((p) => (
                  <ProductCardOptions
                    key={p.product_id}
                    product={p}
                    pauseProduct={pauseProduct}
                    reactivateProduct={reactivateProduct}
                    deleteProduct={deleteProduct}
                  />
                ))}
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </section>

      <section className="pagination-section">
        {/** BACK BUTTON**/}
        {currentPage === 1 ? (
          <button className="button-disable">Back</button>
        ) : (
          <button
            className="button-blue"
            onClick={() => dispatch({ type: TYPES_MYPRODUCTS.backPage })}
          >
            Back
          </button>
        )}

        {/** PAGES  **/}
        {`${currentPage} of ${totalPage}`}

        {/** NEXT BUTTON**/}
        {currentPage === totalPage ? (
          <button className="button-disable">Next</button>
        ) : (
          <button
            className="button-blue"
            onClick={() => dispatch({ type: TYPES_MYPRODUCTS.nextPage })}
          >
            Next
          </button>
        )}
      </section>
    </div>
  );
};

export default MyProductsRoute;
