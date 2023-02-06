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
import SalesCard from "../../components/ViewSales&Buys/SalesCard";
import SectionLoader from "../../components/accesories/SectionLoader";
import ModalRate from "../../components/ViewSales&Buys/ModalRate";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const ViewSalesRoute = () => {
  const { user } = useContext(UserContext);
  const { FetchFunction } = ManageFetch();
  const [states, dispatch] = useReducer(userSalesReducer, initialStates);
  const {
    sales,
    loading,
    errors,
    errorModal,
    currentPage,
    totalPages,
    scores,
    page,
    modal,
    form,
  } = states;

  /**   --------- USE EFFECT ---------   **/
  useEffect(() => {
    if (!user) return;
    const url = `${URL_API}/product/sale/list/sales/${user.user_id}?page=${page}`;
    dispatch({ type: TYPES_USERSALES.setLoading });
    FetchFunction({ url }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: TYPES_USERSALES.setSales, payload: res.data });
      }
    });
  }, [user, page]);

  /**  HANDLE RATE BUYER  **/

  const handleRate = (e) => {
    e.preventDefault();

    //Check for erros:
    if (form.rs_id === "" || form.description.trim() === "") {
      return dispatch({
        type: TYPES_USERSALES.setErrorModal,
        payload: "You need to complete all the fields",
      });
    }

    //Rating:
    dispatch({ type: TYPES_USERSALES.setLoading });
    dispatch({ type: TYPES_USERSALES.setCloseModal });
    const url = `${URL_API}/reputation/user/qualify/buyer`;
    FetchFunction({ url, method: "POST", body: form }).then((res) => {
      if (res.status === 201) {
        //Update the sales:
        dispatch({
          type: TYPES_USERSALES.updateRatedSales,
          payload: form.sale,
        });
      } else {
        dispatch({ type: TYPES_USERSALES.setError, payload: "Server error" });
      }
    });
  };

  return (
    <div className="routeContainer">
      <h1 className="title">My sales</h1>
      <section className="container-cards_row">
        {errors && <h3 className="text-error">{errors}</h3>}
        {loading ? (
          <div className="modal-container">
            <SectionLoader />
          </div>
        ) : (
          <>
            {sales.length !== 0 ? (
              <>
                {sales.map((s) => (
                  <SalesCard
                    key={s.sale_id}
                    sale={s}
                    dispatch={dispatch}
                    user={user}
                  />
                ))}
              </>
            ) : (
              <>
                <b>You don't have sales yet.</b>
              </>
            )}
          </>
        )}
      </section>
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
      {modal && (
        <ModalRate
          dispatch={dispatch}
          scores={scores}
          form={form}
          handleRate={handleRate}
          errorModal={errorModal}
        />
      )}
    </div>
  );
};

export default ViewSalesRoute;
