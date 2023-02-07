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
import ModalRate from "../../components/ViewSales&Buys/ModalRate";
import ModalRateProduct from "../../components/ViewSales&Buys/ModalRateProduct";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const ViewBuysRoute = () => {
  const { user } = useContext(UserContext);
  const { FetchFunction } = ManageFetch();
  const [states, dispatch] = useReducer(userSalesReducer, initialStates);
  const {
    buys,
    loading,
    errors,
    errorModal,
    currentPage,
    totalPages,
    scores,
    page,
    modal,
    modalProduct,
    form,
    productForm,
    errorModalProduct,
  } = states;

  /**   --------- USE EFFECT ---------   **/
  useEffect(() => {
    if (!user) return;
    const url = `${URL_API}/product/sale/list/buys/${user.user_id}?page=${page}`;
    dispatch({ type: TYPES_USERSALES.setLoading });
    FetchFunction({ url }).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        dispatch({ type: TYPES_USERSALES.setBuys, payload: res.data });
      }
    });
  }, [user, page]);

  /**  HANDLE RATE SELLER  **/
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
    const url = `${URL_API}/reputation/user/qualify/seller`;
    FetchFunction({ url, method: "POST", body: form }).then((res) => {
      if (res.status === 201) {
        //Update the sales:
        dispatch({
          type: TYPES_USERSALES.updateRatedBuys,
          payload: form.sale,
        });
      } else {
        dispatch({ type: TYPES_USERSALES.setError, payload: "Server error" });
      }
    });
  };

  /**  HANDLE RATE PRODUCT   **/
  const handleRateProduct = (e) => {
    e.preventDefault();
    //Check for erros:
    if (productForm.rs_id === "" || productForm.description.trim() === "") {
      return dispatch({
        type: TYPES_USERSALES.setErrorModalProduct,
        payload: "You need to complete all the fields",
      });
    }
    //Rating:
    dispatch({ type: TYPES_USERSALES.setLoading });
    dispatch({ type: TYPES_USERSALES.setCloseModalProduct });
    const url = `${URL_API}/reputation/product/qualify`;

    FetchFunction({ url, method: "POST", body: productForm }).then((res) => {
      if (res.status === 201) {
        //Update the sales:

        dispatch({
          type: TYPES_USERSALES.updateRatedProducts,
          payload: {
            sale_id: productForm.sale,
            product_id: productForm.product,
          },
        });
      } else {
        dispatch({
          type: TYPES_USERSALES.setError,
          payload: "Server error",
        });
      }
    });
  };

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
                  <BuysCard
                    key={b.sale_id}
                    buy={b}
                    dispatch={dispatch}
                    user={user}
                  />
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

      {/**  MODAL RATE  USER  **/}

      {modal && (
        <ModalRate
          dispatch={dispatch}
          scores={scores}
          form={form}
          handleRate={handleRate}
          errorModal={errorModal}
        />
      )}

      {/**  MODAL RATE  PRODUCT   **/}
      {modalProduct && (
        <ModalRateProduct
          scores={scores}
          dispatch={dispatch}
          formProduct={productForm}
          handleRateProduct={handleRateProduct}
          errorModalProduct={errorModalProduct}
        />
      )}
    </div>
  );
};

export default React.memo(ViewBuysRoute);
