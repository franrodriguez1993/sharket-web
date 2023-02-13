import { useReducer } from "react";
//Reducer:
import {
  notificationReducer,
  initialStates,
} from "../reducers/reducer/notificationReducer";
import TYPES_NOTIFICACION from "../reducers/types/notificationTypes";

//Fetch:
import ManageFetch from "../utils/manageFetch";
import { URL_API } from "../utils/URL";
const useNotification = () => {
  const [states, dispatch] = useReducer(notificationReducer, initialStates);
  const {
    notifications,
    page,
    currentPage,
    errorFetch,
    loading,
    totalPages,
    msg,
    unseen,
  } = states;
  const { FetchFunction } = ManageFetch();

  /**  HANDLE GET NOTIFICATIONS **/
  const getNotifications = (id) => {
    dispatch({ type: TYPES_NOTIFICACION.setloading });
    const url = `${URL_API}/notification/list/${id}?page=${page}&size=5`;

    FetchFunction({ url }).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: TYPES_NOTIFICACION.setNotifications,
          payload: res.data,
        });
      }
    });
  };

  /**  HANDLE GET NOTIFICATIONS **/
  const checkUnseen = (id) => {
    dispatch({ type: TYPES_NOTIFICACION.setloading });
    const url = `${URL_API}/notification/list/${id}?page=${page}&size=20&seen=check`;

    FetchFunction({ url }).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: TYPES_NOTIFICACION.checkUnseen,
          payload: res.data,
        });
      }
    });
  };

  const MoreNotification = (id) => {
    if (currentPage >= totalPages) {
      dispatch({
        type: TYPES_NOTIFICACION.setMsg,
        payload: "End of notifications",
      });
    } else {
      dispatch({ type: TYPES_NOTIFICACION.nextPage });

      dispatch({ type: TYPES_NOTIFICACION.setloading });
      const url = `${URL_API}/notification/list/${id}?page=${page + 1}&size=5`;
      FetchFunction({ url }).then((res) => {
        if (res.status === 200) {
          dispatch({
            type: TYPES_NOTIFICACION.moreNotifs,
            payload: res.data,
          });
        }
      });
    }
  };

  return {
    notifications,
    page,
    currentPage,
    errorFetch,
    loading,
    getNotifications,
    msg,
    MoreNotification,
    checkUnseen,
    unseen,
  };
};

export default useNotification;
