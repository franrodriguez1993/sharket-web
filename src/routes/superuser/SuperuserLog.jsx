import React, { useContext, useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";

//Reducers:
import { logsReducer, initialStates } from "../../reducers/reducer/logsReducer";
import TYPES_LOGSROUTE from "../../reducers/types/logsTypes";
//Fetch:
import { URL_API } from "../../utils/URL";
import ManageFetch from "../../utils/manageFetch";
//Context:
import { UserContext } from "../../context/UserProvider";
import SectionLoader from "../../components/accesories/SectionLoader";
import LogsCard from "../../components/SuperuserRoute/LogsCard";
const SuperuserLog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { FetchFunction } = ManageFetch();
  const [states, dispatch] = useReducer(logsReducer, initialStates);
  const { page, currentPage, totalPages, errorFetch, loading, dataLogs } =
    states;

  useEffect(() => {
    if (!user) return;
    if (user.Rol.rol_name !== "admin") {
      navigate("/");
    }

    const url = `${URL_API}/superuser/admin/logs/${id}?page=${page}`;
    dispatch({ type: TYPES_LOGSROUTE.setLoading });
    FetchFunction({ url }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: TYPES_LOGSROUTE.setDataLogs, payload: res.data });
      } else if (res.status === 404) {
        dispatch({
          type: TYPES_LOGSROUTE.setErrorFetch,
          payload: "User not found",
        });
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
      <h2 className="fw-bolder mt-2">User logs</h2>

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

      {/**  LOGS   **/}
      {!loading && dataLogs.length !== 0 ? (
        <section className="container-cards_row ">
          {dataLogs.map((l) => (
            <LogsCard key={l.sa_id} log={l} />
          ))}
        </section>
      ) : (
        <div>
          <p className="fw-bolder text-align-center">User has no logs</p>
        </div>
      )}

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

export default SuperuserLog;
