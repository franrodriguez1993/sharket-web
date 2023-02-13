import { useEffect, useReducer } from "react";
//Fetch:
import { URL_API } from "../utils/URL";
import ManageFetch from "../utils/manageFetch";

//Reducer:
import {
  productRouteReducer,
  initialState,
} from "../reducers/reducer/productRouteReducer";
import TYPES_PRODUCTROUTE from "../reducers/types/productRouteTypes";

const useProductRoute = (id, user) => {
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
    sellerProducts,
    favorites,
    loadingFavOperation,
    formComment,
    formError,
  } = productStates;

  /** USE EFFECT PRODUCT  **/
  useEffect(() => {
    const url = `${URL_API}/product/list/${id}`;
    dispatch({ type: TYPES_PRODUCTROUTE.loadingProduct });
    FetchFunction({ url, method: "GET" }).then((res) => {
      if (!res) return;
      if (res.status === 200) {
        dispatch({ type: TYPES_PRODUCTROUTE.productData, payload: res.data });
        //get Similar products:
        getSimilarProducts(res.data.product_type.pt_id);
        //get seller products:
        getSellerProducts(res.data.user.user_id);

        //setting favorites:
        if (user) {
          dispatch({
            type: TYPES_PRODUCTROUTE.setFavorites,
            payload: user.product_favorites,
          });
        }
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

  /** GET SELLER PRODUCTS**/
  function getSellerProducts(id) {
    const url = `${URL_API}/product/list/seller/${id}?size=4`;
    FetchFunction({ url }).then((res) => {
      if (!res) return;
      if (res.status === 200) {
        dispatch({
          type: TYPES_PRODUCTROUTE.sellerProductsData,
          payload: res.data.products,
        });
      }
    });
  }

  /**  ------  HANDLE FAVORITE  ------  **/
  const makeFavProduct = (e) => {
    e.preventDefault();
    const url = `${URL_API}/product/favorite`;
    const body = { user: user.user_id, product: product.product_id };
    dispatch({ type: TYPES_PRODUCTROUTE.loadingFavOperation });
    FetchFunction({ url, body, method: "POST" }).then((res) => {
      if (!res) return;
      else if (res.status === 201) {
        dispatch({
          type: TYPES_PRODUCTROUTE.addNewFavorite,
          payload: product.product_id,
        });
      } else if (res.status === 200) {
        dispatch({
          type: TYPES_PRODUCTROUTE.removeOneFavorite,
          payload: product.product_id,
        });
      }
    });
  };

  /**  HANDLE CHANGE FORMCOMMENT **/
  const HCFormComment = (e) => {
    dispatch({
      type: TYPES_PRODUCTROUTE.handleChangeComment,
      payload: e.target,
    });
  };

  /**  HANDLE SUBMIT FORMCOMMENT  **/
  const HSFormComment = (e) => {
    e.preventDefault();
    if (formComment.body.trim() === "") return;
    else if (formComment.body.trim().length > 250) {
      return dispatch({
        type: TYPES_PRODUCTROUTE.errorFormComment,
        payload: "Question is to long",
      });
    }
    dispatch({ type: TYPES_PRODUCTROUTE.loadingProduct });
    const url = `${URL_API}/comment/create`;
    const body = {
      ...formComment,
      product: product.product_id,
      user: user?.user_id,
    };
    FetchFunction({ url, method: "POST", body }).then((res) => {
      if (res.status === 201) {
        dispatch({
          type: TYPES_PRODUCTROUTE.addNewComment,
          payload: {
            comment_id: `${Date.now()}`,
            comment_body: body.body,
            comment_parent: true,
            comment_reply: null,
            comments: [],
          },
        });
      } else {
        dispatch({
          type: TYPES_PRODUCTROUTE.errorFormComment,
          payload: "Server error, please try later.",
        });
      }
    });
  };

  return {
    product,
    loadingProduct,
    error,
    dispatch,
    comments,
    loadingComments,
    commentPage,
    commentTotalPage,
    commentCurrentPage,
    similarProducts,
    sellerProducts,
    favorites,
    loadingFavOperation,
    formComment,
    formError,
    makeFavProduct,
    HCFormComment,
    HSFormComment,
  };
};

export default useProductRoute;
