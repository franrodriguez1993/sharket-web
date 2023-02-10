import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
//Reducers:
import { logsReducer, initialStates } from "../../reducers/reducer/logsReducer";
import TYPES_LOGSROUTE from "../../reducers/types/logsTypes";
//Fetch:
import { URL_API } from "../../utils/URL";
import ManageFetch from "../../utils/manageFetch";
//Context:
import { UserContext } from "../../context/UserProvider";
import SectionLoader from "../../components/accesories/SectionLoader";
import SuperuserCard from "../../components/SuperuserRoute/SuperuserCard";
const SuperuserList = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { FetchFunction } = ManageFetch();
  const [states, dispatch] = useReducer(logsReducer, initialStates);
  const { page, currentPage, totalPages, superusers, errorFetch, loading } =
    states;

  useEffect(() => {
    if (!user) return;
    if (user.Rol.rol_name !== "admin") {
      navigate("/");
    }

    dispatch({ type: TYPES_LOGSROUTE.setLoading });
    const url = `${URL_API}/superuser/admin/list/superuser?page=${page}`;
    FetchFunction({ url }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: TYPES_LOGSROUTE.setSuperusers, payload: res.data });
      } else {
        dispatch({
          type: TYPES_LOGSROUTE.setErrorFetch,
          payload: "Server error",
        });
      }
    });
  }, [user, page]);

  return (
    <div className="routeContainer">
      <h1 className="title">Superusers</h1>

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

      {/**  SUPERUSERS LIST  **/}
      <section className="container-cards_row">
        {superusers.length !== 0 &&
          superusers.map((s) => (
            <SuperuserCard key={s.user_id} superuser={s} />
          ))}
      </section>

      {/**  PAGINATION  **/}
      <section className="pagination-section">
        {/*  BACK BUTTON */}
        {currentPage === 1 ? (
          <button className="button-disable">Back</button>
        ) : (
          <button
            className="button-blue"
            onClick={() => dispatch({ type: TYPES_LOGSROUTE.previewPage })}
          >
            Back
          </button>
        )}

        {<b>{`${currentPage} of ${totalPages}`}</b>}

        {/*  NEXT BUTTON */}
        {currentPage < totalPages ? (
          <button
            className="button-blue"
            onClick={() => dispatch({ type: TYPES_LOGSROUTE.nextPage })}
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

export default SuperuserList;
