import React, { useEffect, useReducer } from "react";
import "../../css/homeRoute/HomeRoute.css";
//Reducer:
import TYPES_HOME from "../../reducers/types/homeTypes";
import { homeReducer, initialStates } from "../../reducers/reducer/homeReducer";
//Fetch:
import { URL_API } from "../../utils/URL";
import ManageFetch from "../../utils/manageFetch";
//Components:
import Carrousel from "../../components/homeRoute/Carrousel";
import RecentProducts from "../../components/homeRoute/RecentProducts";
import OfferProducts from "../../components/homeRoute/OfferProducts";
import GamerProducts from "../../components/homeRoute/GamerProducts";

const HomeRoute = () => {
  const [states, dispatch] = useReducer(homeReducer, initialStates);
  const {
    loadingLatest,
    offerProducts,
    loadingOffer,
    LatestProducts,
    loadingGamer,
    gamerProducts,
  } = states;

  const { FetchFunction } = ManageFetch();

  useEffect(() => {
    getLatest();

    getOffers();

    getGamerProducts();
  }, []);

  /**  GET LATEST **/
  function getLatest() {
    dispatch({ type: TYPES_HOME.setLoadingLatest });
    const url = `${URL_API}/product/list?size=5`;
    FetchFunction({ url }).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: TYPES_HOME.setLatestProducts,
          payload: res.data.products,
        });
      }
    });
  }

  /**  GET OFFERS **/
  function getOffers() {
    dispatch({ type: TYPES_HOME.setLoadingOffer });
    const url = `${URL_API}/product/list/offer/all?size=5`;
    FetchFunction({ url }).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: TYPES_HOME.setOfferProducts,
          payload: res.data.products,
        });
      }
    });
  }

  /**  GET GAMER PRODUCTS **/
  function getGamerProducts() {
    dispatch({ type: TYPES_HOME.setLoadingGamer });
    const url = `${URL_API}/product/list/type/56dc6425-ff6b-4966-995c-0da055ae6d14?size=5`;
    FetchFunction({ url }).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: TYPES_HOME.setGamerProducts,
          payload: res.data.products,
        });
      }
    });
  }
  return (
    <div className="routeContainer">
      <section className="homeRoute-presentation">
        <Carrousel />
      </section>

      {/** RECENT PRODUCTS **/}
      <h1 className="fw-bolder mt-5 mb-5">Recent Products</h1>
      <RecentProducts products={LatestProducts} loading={loadingLatest} />

      {/** OFFER PRODUCTS **/}
      <img
        src="/assets/img/banner/FlashSales.png"
        alt="flashsales"
        className="home-img"
      />
      <OfferProducts products={offerProducts} loading={loadingOffer} />

      {/** GAMER PRODUCTS **/}
      <img
        src="/assets/img/banner/gamermania.png"
        alt="flashsales"
        className="home-img"
      />

      <GamerProducts products={gamerProducts} loading={loadingGamer} />
    </div>
  );
};

export default HomeRoute;
