import React, { useContext, useEffect, useReducer } from "react";
import { UserContext } from "../../context/UserProvider";
//Hooks:
import { URL_API } from "../../utils/URL";
import ManageFetch from "../../utils/manageFetch";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Reducer:
import TYPES_USERSALES from "../../reducers/types/userSalesTypes";
import {
  userSalesReducer,
  initialStates,
} from "../../reducers/reducer/userSalesReducer";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Components:
import BuysCard from "../../components/ViewSales&Buys/BuysCard";
import SectionLoader from "../../components/accesories/SectionLoader";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const ViewBuysRoute = () => {
  const { user } = useContext(UserContext);
  const { FetchFunction } = ManageFetch();
  const [states, dispatch] = useReducer(userSalesReducer, initialStates);
  const { buys, loading, errors, currentPage, totalPages, page } = states;

  /**   --------- USE EFFECT ---------   **/
  useEffect(() => {
    if (!user) return;
    const url = `${URL_API}/product/sale/list/buys/${user.user_id}?page=${page}`;
    dispatch({ type: TYPES_USERSALES.setLoading });
    FetchFunction({ url }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: TYPES_USERSALES.setBuys, payload: res.data });
      }
    });
  }, [user, page]);

  return (
    <div className="routeContainer">
      <h1 className="title">My buys</h1>

      <section className="container-cards_row">
        {errors && <h3 className="text-error">{errors}</h3>}

        {loading ? (
          <div className="modal-container">
            <SectionLoader />
          </div>
        ) : (
          <>
            {buys.length !== 0 ? (
              <>
                {buys.map((b) => (
                  <BuysCard key={b.sale_id} buy={b} />
                ))}
              </>
            ) : (
              <p>You don't have buys yet.</p>
            )}
          </>
        )}
      </section>
      {/**  PAGINATION SECTION  **/}
      <section className="pagination-section">
        {/**  BACK BUTTON **/}
        {currentPage === 1 ? (
          <button className="button-disable">Back</button>
        ) : (
          <button
            className="button-blue"
            onClick={() => dispatch({ type: TYPES_USERSALES.setBackPage })}
          >
            Back
          </button>
        )}

        {<b>{`${currentPage} of ${totalPages}`}</b>}

        {/**  NEXT BUTTON **/}
        {currentPage < totalPages ? (
          <button
            className="button-blue"
            onClick={() => dispatch({ type: TYPES_USERSALES.setNextPage })}
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

export default React.memo(ViewBuysRoute);
