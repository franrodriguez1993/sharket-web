import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
//Reducers:
import {
  profileReducer,
  initialStates,
} from "../reducers/reducer/profileReducer";
import TYPES_PROFILEROUTE from "../reducers/types/profileTypes";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Fetch:
import { URL_API } from "../utils/URL";
import ManageFetch from "../utils/manageFetch";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Validate form:
import validateForm from "../utils/validateForm";

const useProfile = (user, token, logIn) => {
  const navigate = useNavigate();
  const { FetchFunction } = ManageFetch();
  const [states, dispatch] = useReducer(profileReducer, initialStates);
  const {
    loading,
    errorsForm,
    errorFetch,
    personalForm,
    mailForm,
    passwordForm,
  } = states;

  /** -----------------  USE EFFECT  -----------------  **/
  useEffect(() => {
    //Personal form:
    dispatch({
      type: TYPES_PROFILEROUTE.setPersonalForm,
      payload: {
        username: user.user_username,
        name: user.user_name,
        lastname: user.user_lastname,
        dni: user.user_dni,
        phone: user.user_phone,
      },
    });
  }, []);

  /** -----------------CHANGE HANDLERS  -----------------  **/
  //Personal data:
  const HCPersonalForm = (e) => {
    dispatch({
      type: TYPES_PROFILEROUTE.handleChangePersonalform,
      payload: e.target,
    });
  };
  //Mail:
  const HCMail = (e) => {
    dispatch({ type: TYPES_PROFILEROUTE.handleChangeMail, payload: e.target });
  };
  //Password:
  const HCPassword = (e) => {
    dispatch({
      type: TYPES_PROFILEROUTE.handleChangePassword,
      payload: e.target,
    });
  };

  /** -----------------SUBMIT HANDLERS  -----------------  **/

  /* PERSONAL DATA:  */
  const HSPersonalForm = (e) => {
    e.preventDefault();

    //Reset Errors:
    dispatch({ type: TYPES_PROFILEROUTE.resetErrorsForm });

    //Check errors:
    const checkErrors = validateForm(personalForm, [
      "username",
      "name",
      "lastname",
      "dni",
      "phone",
    ]);
    if (Object.keys(checkErrors).length !== 0) {
      return dispatch({
        type: TYPES_PROFILEROUTE.setErrorsForm,
        payload: checkErrors,
      });
    }

    //Update data:
    const url = `${URL_API}/user/update/profile/${user.user_id}`;
    //dinamic Data:
    const data = {};
    if (personalForm.username !== user.user_username) {
      data.username = personalForm.username;
    }
    if (personalForm.name !== user.user_name) {
      data.name = personalForm.name;
    }
    if (personalForm.lastname !== user.user_lastname) {
      data.lastname = personalForm.lastname;
    }
    if (personalForm.dni !== user.user_dni) {
      data.dni = personalForm.dni;
    }
    if (personalForm.phone !== user.user_phone) {
      data.phone = personalForm.phone;
    }
    dispatch({ type: TYPES_PROFILEROUTE.setloading });
    FetchFunction({ url, method: "PUT", body: data }).then((res) => {
      if (res.status === 200) {
        logIn(user.user_id, token);
        navigate("/profile");
      } else if (res.msg === "USERNAME_IN_USE") {
        dispatch({
          type: TYPES_PROFILEROUTE.setErrorFetch,
          payload: "Username already in use",
        });
      } else {
        dispatch({ type: TYPES_PROFILEROUTE.setErrorFetch, payload: res.msg });
      }
    });
  };

  /* MAIL:  */
  const HSMail = (e) => {
    e.preventDefault();

    //Reset Errors:
    dispatch({ type: TYPES_PROFILEROUTE.resetErrorsForm });

    //Check errors:
    const checkErrors = validateForm(mailForm, ["mail"]);
    if (Object.keys(checkErrors).length !== 0) {
      return dispatch({
        type: TYPES_PROFILEROUTE.setErrorsForm,
        payload: checkErrors,
      });
    }
    if (mailForm.mail === user.user_mail) {
      return dispatch({
        type: TYPES_PROFILEROUTE.setErrorsForm,
        payload: { mail: "This is your current mail." },
      });
    }

    const url = `${URL_API}/user/update/mail/${user.user_id}`;
    dispatch({ type: TYPES_PROFILEROUTE.setloading });
    FetchFunction({ url, method: "PUT", body: mailForm }).then((res) => {
      if (res.status === 200) {
        logIn(user.user_id, token);
        navigate("/profile");
      } else if (res.status === 400) {
        return dispatch({
          type: TYPES_PROFILEROUTE.setErrorFetch,
          payload: "Mail in use",
        });
      } else {
        return dispatch({
          type: TYPES_PROFILEROUTE.setErrorFetch,
          payload: "Server error",
        });
      }
    });
  };

  /* PASSWORD::  */

  const HSPassword = (e) => {
    e.preventDefault();

    //Reset Errors:
    dispatch({ type: TYPES_PROFILEROUTE.resetErrorsForm });

    //Check Errors:
    const checkErrors = validateForm(passwordForm, ["password", "repassword"]);
    if (Object.keys(checkErrors).length !== 0) {
      return dispatch({
        type: TYPES_PROFILEROUTE.setErrorsForm,
        payload: checkErrors,
      });
    }

    //Update password:
    const url = `${URL_API}/user/update/password/${user.user_id}`;
    dispatch({ type: TYPES_PROFILEROUTE.setloading });
    FetchFunction({
      url,
      method: "PUT",
      body: { password: passwordForm.password },
    }).then((res) => {
      if (res.status === 200) {
        navigate("/profile");
      } else {
        dispatch({
          type: TYPES_PROFILEROUTE.setErrorFetch,
          payload: "Server error",
        });
      }
    });
  };

  /** RETURNS **/
  return {
    loading,
    errorsForm,
    errorFetch,
    personalForm,
    HCPersonalForm,
    HSPersonalForm,
    HCMail,
    mailForm,
    HSMail,
    passwordForm,
    HCPassword,
    HSPassword,
  };
};

export default useProfile;
