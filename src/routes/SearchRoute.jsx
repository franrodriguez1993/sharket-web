import React, { useEffect, useReducer, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/SearchRoute/SearchRoute.css";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Fetchs:
import { URL_API } from "../utils/URL";
import ManageFetch from "../utils/manageFetch";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Reducers:
import {
  searchRouteReducer,
  initialState,
} from "../reducers/reducer/searchRouteReducer";
import { TYPES_SEARCHROUTE } from "../reducers/types/searchRouteType";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Components:
import ProductRowCard from "../components/SearchRoute/ProductRowCard";
import SectionLoader from "../components/accesories/SectionLoader";
import ParamSection from "../components/SearchRoute/ParamSection";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const SearchRoute = () => {
  const navigate = useNavigate();
  const { search } = useParams();
  const [searchParam, setSearchParam] = useState(search);
  const { FetchFunction } = ManageFetch();

  /** ~~~~~~~~~~~ useReducer ~~~~~~~~~~~ **/
  const [searchState, dispatch] = useReducer(searchRouteReducer, initialState);
  //Destructuring State:
  const {
    results,
    params,
    error,
    quantity,
    currentPage,
    totalPages,
    loading,
    categories,
    filteredTypes,
  } = searchState;

  /**  FUNCTION SEARCH **/
  function searchFunction(searchParam, params) {
    dispatch({ type: TYPES_SEARCHROUTE.searchLoading });
    const url = `${URL_API}/product/list/search/${searchParam}?pmin=${params.pmin}&pmax=${params.pmax}&status=${params.status}&category=${params.category}&type=${params.type}&page=${params.page}&size=${params.size}`;
    FetchFunction({ url, method: "GET" }).then((res) => {
      if (!res) return;
      if (res.status === 200) {
        dispatch({ type: TYPES_SEARCHROUTE.searchResult, payload: res.data });
      } else if (res.status === 500) {
        navigate("/error");
      } else {
        dispatch({ type: TYPES_SEARCHROUTE.searchError, payload: res.msg });
      }
    });
  }

  /**  USE EFFECT SEARCH  **/
  useEffect(() => {
    searchFunction(searchParam, params);
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!params.name.trim()) return;
    setSearchParam(params.name);
    searchFunction(params.name, params);
  };

  /**  HANDLE - PAGE **/
  const handlePreviousPage = (e) => {
    e.preventDefault();
    dispatch({ type: TYPES_SEARCHROUTE.previousPage });
    searchFunction(searchParam, { ...params, page: params.page - 1 });
  };
  const handleNextPage = (e) => {
    e.preventDefault();
    dispatch({ type: TYPES_SEARCHROUTE.nextPage });
    searchFunction(searchParam, { ...params, page: params.page + 1 });
  };
  return (
    <div className="containerRoute-search">
      {/**  --------------- SEARCH PARAMS  --------------- **/}
      <section className="containerParams-search">
        <h3 className="resultSearch-text">Search params</h3>
        <ParamSection
          categories={categories}
          filteredTypes={filteredTypes}
          dispatch={dispatch}
          params={params}
          handleSearch={handleSearch}
        />
      </section>

      {/**  --------------- SEARCH RESULTS  --------------- **/}
      <section className="containerResults-search">
        <h3 className="resultSearch-text">Results for "{searchParam}"</h3>
        {error && <p className="errorMessage-search">{error}</p>}
        {loading ? (
          <SectionLoader />
        ) : (
          <>
            {results.length !== 0 ? (
              <>
                <p>Total found: {quantity}</p>
                <table className="containerProducts-search">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Product</th>
                      <th scope="col">Brand</th>
                      <th scope="col">Price</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody className="productRow-card">
                    {results.map((p) => (
                      <ProductRowCard key={p.product_id} product={p} />
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <div className="noProducts-search">
                There're no products for the search params
              </div>
            )}
            {/**  -------- BUTTONS SECTION --------  **/}

            <div className="containerButtonPages-search">
              <p>
                Page {currentPage} of {totalPages}
              </p>
              {/** PREVIOUS BOTTON**/}
              {params.page === 0 ? (
                <button disabled={true} className="btnSearch-disabled">
                  Previous
                </button>
              ) : (
                <button
                  onClick={handlePreviousPage}
                  className="btnSearch-active"
                >
                  Previous
                </button>
              )}
              {/** NEXT BOTTON**/}
              {params.page + 1 === totalPages ? (
                <button disabled={true} className="btnSearch-disabled">
                  Next
                </button>
              ) : (
                <button onClick={handleNextPage} className="btnSearch-active">
                  Next
                </button>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default SearchRoute;
