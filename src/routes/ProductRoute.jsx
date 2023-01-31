import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import "../css/ProductRoute/ProductRoute.css";
//Fetch:
import { URL_API } from "../utils/URL";
import ManageFetch from "../utils/manageFetch";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Reducer:
import {
  productRouteReducer,
  initialState,
} from "../reducers/reducer/productRouteReducer";
import TYPES_PRODUCTROUTE from "../reducers/types/productRouteTypes";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Components:
import ProductData from "../components/productRoute/ProductData";
import SellerData from "../components/productRoute/SellerData";
import CommentSection from "../components/productRoute/CommentSection";
import SectionLoader from "../components/accesories/SectionLoader";
import SimilarProducts from "../components/productRoute/SimilarProducts";
import SellerProducts from "../components/productRoute/SellerProducts";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const ProductRoute = () => {
  const { id } = useParams();
  const { FetchFunction } = ManageFetch();
  const [productStates, dispatch] = useReducer(
    productRouteReducer,
    initialState
  );
  const {
    product,
    loadingProduct,
    error,
    comments,
    loadingComments,
    commentPage,
    commentTotalPage,
    commentCurrentPage,
    similarProducts,
    loadingReputationSeller,
    reputationSeller,
    sellerProducts,
  } = productStates;

  /** USE EFFECT PRODUCT  **/
  useEffect(() => {
    window.scroll(0, 0);
    const url = `${URL_API}/product/list/${id}`;
    dispatch({ type: TYPES_PRODUCTROUTE.loadingProduct });
    FetchFunction({ url, method: "GET" }).then((res) => {
      if (!res) return;
      if (res.status === 200) {
        dispatch({ type: TYPES_PRODUCTROUTE.productData, payload: res.data });

        //get Similar products:
        getSimilarProducts(res.data.product_type.pt_id);
        //get Seller Reputation:
        getReputationSeller(res.data.user.user_id);
        //get seller products:
        getSellerProducts(res.data.user.user_id);
      } else if (res.status === 404) {
        dispatch({
          type: TYPES_PRODUCTROUTE.error,
          payload: "Product not found",
        });
      }
    });
  }, [id]);

  /** USE EFFECT COMMENTS   **/
  useEffect(() => {
    if (Object.keys(product).length === 0) return;
    getComments(product.product_id, commentPage);
  }, [product, commentPage]);

  /** GET COMMENTS**/
  function getComments(id, page) {
    const url = `${URL_API}/comment/list/${id}?page=${page}&size=5`;
    dispatch({ type: TYPES_PRODUCTROUTE.loadingComments });
    FetchFunction({ url }).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: TYPES_PRODUCTROUTE.commentsData,
          payload: res.data,
        });
      }
    });
  }
  /** GET SIMILAR PRODUCTS**/
  function getSimilarProducts(type) {
    const url = `${URL_API}/product/list/type/${type}?size=4`;
    FetchFunction({ url }).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: TYPES_PRODUCTROUTE.similarProductsData,
          payload: res.data.products,
        });
      }
    });
  }
  /** GET REPUTATION SELLER**/
  function getReputationSeller(id) {
    dispatch({ type: TYPES_PRODUCTROUTE.loadingReputationSeller });
    const url = `${URL_API}/reputation/user/seller/${id}`;
    FetchFunction({ url }).then((res) => {
      if (!res) return;
      if (res.status === 200) {
        dispatch({
          type: TYPES_PRODUCTROUTE.reputationsSellerData,
          payload: res.data,
        });
      }
    });
  }
  /** GET SELLER PRODUCTS**/
  function getSellerProducts(id) {
    const url = `${URL_API}/product/list/user/${id}?size=4`;
    FetchFunction({ url }).then((res) => {
      if (!res) return;
      if (res.status === 200) {
        console.log(res.data);
        dispatch({
          type: TYPES_PRODUCTROUTE.sellerProductsData,
          payload: res.data.products,
        });
      }
    });
  }

  return (
    <div className="ProductRoute-container">
      {!loadingProduct ? (
        <>
          {Object.keys(product).length !== 0 ? (
            <>
              {/**  PRODUCT AND SELLER SECTION  **/}
              <section className="ProductRoute-principal">
                <ProductData product={product} />
                <SellerData
                  seller={product.user}
                  address={product.user_address}
                  reputations={reputationSeller.reputation}
                  loadingReputationSeller={loadingReputationSeller}
                />
              </section>

              {/**  COMMENTS SECTION **/}
              {comments.length !== 0 && (
                <CommentSection
                  comments={comments}
                  loadingComments={loadingComments}
                  commentPage={commentPage}
                  commentTotalPage={commentTotalPage}
                  commentCurrentPage={commentCurrentPage}
                  dispatch={dispatch}
                />
              )}

              {/**  SIMILAR PRODUCTS SECTION **/}
              {similarProducts.length !== 0 && (
                <SimilarProducts products={similarProducts} />
              )}
              {/**  SELLER PRODUCTS SECTION **/}
              {sellerProducts.length !== 0 && (
                <SellerProducts
                  products={sellerProducts}
                  seller={product.user.user_username}
                />
              )}
            </>
          ) : (
            <>
              {/** ERROR SECTION **/}
              <section className="productRoute-error">
                <img
                  src="/assets/img/errorShark.png"
                  alt="error-sharknet"
                  className="productRoute-error-img"
                />
                {<h3 className="productRoute-error-msg">{error}</h3>}
              </section>
            </>
          )}
        </>
      ) : (
        <section className="productRoute-Contloader">
          <SectionLoader />
        </section>
      )}
    </div>
  );
};

export default ProductRoute;
