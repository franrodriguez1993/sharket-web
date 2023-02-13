import React, { useContext, useEffect, useReducer } from "react";
//Context:
import { UserContext } from "../../context/UserProvider";

//Fetch:
import ManageFetch from "../../utils/manageFetch";
import { URL_API } from "../../utils/URL";

//Reducer:
import {
  favoritesReducer,
  initialStates,
} from "../../reducers/reducer/favoritesReducer";
import TYPES_FAVORITES from "../../reducers/types/favoritesTypes";

//Components:
import SectionLoader from "../../components/accesories/SectionLoader";
import ProductsCard from "../../components/accesories/ProductsCard";

const FavoritesRoute = () => {
  const { user } = useContext(UserContext);
  const { FetchFunction } = ManageFetch();
  const [states, dispatch] = useReducer(favoritesReducer, initialStates);
  const { loading, errorFetch, favorites, page, currentPage, totalPages } =
    states;

  useEffect(() => {
    if (!user) return;

    dispatch({ type: TYPES_FAVORITES.setLoading });
    const url = `${URL_API}/product/list/favorite/${user.user_id}?page=${page}`;
    FetchFunction({ url }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: TYPES_FAVORITES.setFavorites, payload: res.data });
      } else {
        dispatch({
          type: TYPES_FAVORITES.setErrorFetch,
          payload: "Server error",
        });
      }
    });
  }, [user, page]);

  return (
    <div className="routeContainer">
      <h1 className="title">My favorites</h1>

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

      {!loading && favorites.length !== 0 ? (
        <section className="section-cards-flex-wrap">
          {favorites.map((p) => (
            <ProductsCard key={p.product_id} product={p.product} />
          ))}
        </section>
      ) : (
        <section className="container-lg text-align-center fw-bolder p-5">
          You don't have favorites
        </section>
      )}

      {/**  PAGINATION  **/}
      <section className="pagination-section">
        {/*  BACK BUTTON */}
        {currentPage === 1 ? (
          <button className="button-disable">Back</button>
        ) : (
          <button
            className="button-blue"
            onClick={() => dispatch({ type: TYPES_FAVORITES.backPage })}
          >
            Back
          </button>
        )}

        {<b>{`${currentPage} of ${totalPages}`}</b>}

        {/*  NEXT BUTTON */}
        {currentPage < totalPages ? (
          <button
            className="button-blue"
            onClick={() => dispatch({ type: TYPES_FAVORITES.nextPage })}
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

export default FavoritesRoute;
