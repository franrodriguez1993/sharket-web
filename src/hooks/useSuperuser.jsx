import React, { useReducer } from "react";
//Fetch:
import { URL_API } from "../utils/URL";
import ManageFetch from "../utils/manageFetch";
//Reducers:
import TYPES_SUPERUSER from "../reducers/types/superuserTypes";
import {
  superuserReducer,
  initialStates,
} from "../reducers/reducer/superuserReducer";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const useSuperuser = (user) => {
  const [states, dispatch] = useReducer(superuserReducer, initialStates);
  const { loading, errorFetch, usertarget, search, successMsg } = states;

  const { FetchFunction } = ManageFetch();
  /**  HANDLE CHANGE SEARCH   **/
  const HCSearch = (e) => {
    dispatch({
      type: TYPES_SUPERUSER.handleChangeSearch,
      payload: e.target.value,
    });
  };

  /**  HANDLE SUBMIT SEARCH   **/
  const HSSearch = (e, mode = "staff") => {
    e.preventDefault();
    if (search === "") return;
    if (search.trim() === user.user_mail) {
      return dispatch({
        type: TYPES_SUPERUSER.setErrorFetch,
        payload: "You can't search for your own mail.",
      });
    }

    const url = `${URL_API}/user/data/mail`;
    dispatch({ type: TYPES_SUPERUSER.setLoading });
    dispatch({ type: TYPES_SUPERUSER.resetusertarget });
    FetchFunction({ url, method: "POST", body: { mail: search } }).then(
      (res) => {
        if (res.status === 200) {
          if (mode === "staff") {
            //Verify authoritation:
            if (
              res.data.Rol.rol_name === "admin" ||
              res.data.Rol.rol_name === "staff"
            ) {
              return dispatch({
                type: TYPES_SUPERUSER.setErrorFetch,
                payload: "You don't have access to that user data.",
              });
            }
          }
          dispatch({
            type: TYPES_SUPERUSER.setusertarget,
            payload: res.data,
          });
        } else if (res.status === 404) {
          dispatch({
            type: TYPES_SUPERUSER.setErrorFetch,
            payload: "User not found",
          });
        } else {
          dispatch({
            type: TYPES_SUPERUSER.setErrorFetch,
            payload: "Server error",
          });
        }
      }
    );
  };

  /**  HANDLE VERIFY   **/
  const verifyUser = (e, id) => {
    e.preventDefault();
    dispatch({ type: TYPES_SUPERUSER.setLoading });

    const url = `${URL_API}/superuser/staff/verify/${id}`;

    FetchFunction({ url, method: "PUT" }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: TYPES_SUPERUSER.resetusertarget });
        dispatch({
          type: TYPES_SUPERUSER.setSuccessMsg,
          payload: "User verified successfully",
        });
      } else {
        dispatch({
          type: TYPES_SUPERUSER.setErrorFetch,
          payload: "Server error",
        });
      }
    });
  };

  const unverifyUser = (e, id) => {
    e.preventDefault();
    dispatch({ type: TYPES_SUPERUSER.setLoading });
    const url = `${URL_API}/superuser/staff/unverify/${id}`;

    FetchFunction({ url, method: "PUT" }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: TYPES_SUPERUSER.resetusertarget });
        dispatch({
          type: TYPES_SUPERUSER.setSuccessMsg,
          payload: "User unverified successfully",
        });
      } else {
        dispatch({
          type: TYPES_SUPERUSER.setErrorFetch,
          payload: "Server error",
        });
      }
    });
  };

  /**  HANDLE SUSPEND   **/
  const suspendUser = (e, id, mode) => {
    e.preventDefault();
    dispatch({ type: TYPES_SUPERUSER.setLoading });
    let url = "";
    if (mode === "staff") {
      url = `${URL_API}/superuser/staff/suspend/${id}`;
    } else {
      url = `${URL_API}/superuser/admin/suspend/${id}`;
    }
    FetchFunction({ url, method: "PUT" }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: TYPES_SUPERUSER.resetusertarget });
        dispatch({
          type: TYPES_SUPERUSER.setSuccessMsg,
          payload: "User suspended",
        });
      } else {
        dispatch({
          type: TYPES_SUPERUSER.setErrorFetch,
          payload: "Server error",
        });
      }
    });
  };

  /**  HANDLE REACTIVE   **/
  const reactiveUser = (e, id, mode) => {
    e.preventDefault();
    let url = "";
    if (mode === "staff") {
      url = `${URL_API}/superuser/staff/reactive/${id}`;
    } else {
      url = `${URL_API}/superuser/admin/reactive/${id}`;
    }

    dispatch({ type: TYPES_SUPERUSER.setLoading });

    FetchFunction({ url, method: "PUT" }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: TYPES_SUPERUSER.resetusertarget });
        dispatch({
          type: TYPES_SUPERUSER.setSuccessMsg,
          payload: "User reactivated successfully",
        });
      } else {
        dispatch({
          type: TYPES_SUPERUSER.setErrorFetch,
          payload: "Server error",
        });
      }
    });
  };

  /**  HANDLE DELETE   **/
  const deleteUser = (e, id, mode) => {
    e.preventDefault();
    let url = "";
    if (mode === "staff") {
      url = `${URL_API}/superuser/staff/del/${id}`;
    } else {
      url = `${URL_API}/superuser/admin/del/${id}`;
    }
    dispatch({ type: TYPES_SUPERUSER.setLoading });

    FetchFunction({ url, method: "DELETE" }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: TYPES_SUPERUSER.resetusertarget });
        dispatch({
          type: TYPES_SUPERUSER.setSuccessMsg,
          payload: "User deleted",
        });
      } else {
        dispatch({
          type: TYPES_SUPERUSER.setErrorFetch,
          payload: "Server error",
        });
      }
    });
  };

  /**  HANDLE ADMIN   **/
  const upgradeAdmin = (e, id) => {
    e.preventDefault();
    dispatch({ type: TYPES_SUPERUSER.setLoading });
    const url = `${URL_API}/superuser/admin/upgrade/admin/${id}`;

    FetchFunction({ url, method: "PUT" }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: TYPES_SUPERUSER.resetusertarget });
        dispatch({
          type: TYPES_SUPERUSER.setSuccessMsg,
          payload: "User upgraded successfully",
        });
      } else {
        dispatch({
          type: TYPES_SUPERUSER.setErrorFetch,
          payload: "Server error",
        });
      }
    });
  };

  const downgradeAdmin = (e, id) => {
    e.preventDefault();
    dispatch({ type: TYPES_SUPERUSER.setLoading });
    const url = `${URL_API}/superuser/admin/downgrade/admin/${id}`;

    FetchFunction({ url, method: "PUT" }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: TYPES_SUPERUSER.resetusertarget });
        dispatch({
          type: TYPES_SUPERUSER.setSuccessMsg,
          payload: "User downgraded",
        });
      } else {
        dispatch({
          type: TYPES_SUPERUSER.setErrorFetch,
          payload: "Server error",
        });
      }
    });
  };

  /**  HANDLE STAFF   **/
  const upgradeStaff = (e, id) => {
    e.preventDefault();
    dispatch({ type: TYPES_SUPERUSER.setLoading });
    const url = `${URL_API}/superuser/admin/upgrade/staff/${id}`;

    FetchFunction({ url, method: "PUT" }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: TYPES_SUPERUSER.resetusertarget });
        dispatch({
          type: TYPES_SUPERUSER.setSuccessMsg,
          payload: "User upgraded successfully",
        });
      } else {
        dispatch({
          type: TYPES_SUPERUSER.setErrorFetch,
          payload: "Server error",
        });
      }
    });
  };

  const downgradeStaff = (e, id) => {
    e.preventDefault();
    dispatch({ type: TYPES_SUPERUSER.setLoading });
    const url = `${URL_API}/superuser/admin/downgrade/staff/${id}`;

    FetchFunction({ url, method: "PUT" }).then((res) => {
      if (res.status === 200) {
        dispatch({ type: TYPES_SUPERUSER.resetusertarget });
        dispatch({
          type: TYPES_SUPERUSER.setSuccessMsg,
          payload: "User downgraded",
        });
      } else {
        dispatch({
          type: TYPES_SUPERUSER.setErrorFetch,
          payload: "Server error",
        });
      }
    });
  };

  return {
    loading,
    errorFetch,
    usertarget,
    HCSearch,
    search,
    HSSearch,
    successMsg,
    verifyUser,
    unverifyUser,
    suspendUser,
    reactiveUser,
    deleteUser,
    upgradeAdmin,
    downgradeAdmin,
    upgradeStaff,
    downgradeStaff,
  };
};

export default useSuperuser;
