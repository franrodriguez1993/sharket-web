import React, { useReducer } from "react";

// Reducer:
import TYPES_REGISTER from "../reducers/types/RegisterTypes";
import {
  registerReducer,
  initialStates,
} from "../reducers/reducer/RegisterReducer";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Fetch:
import ManageFetch from "../utils/manageFetch";
import { URL_API } from "../utils/URL";

const useRegister = () => {
  const [states, dispatch] = useReducer(registerReducer, initialStates);
  const { form, loading, errors, errorFetch, successMsg } = states;

  const { FetchFunction } = ManageFetch();

  /**  FUNCTION VALIDATE  **/

  function validationForm() {
    let regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let formErrors = {};

    //Username:
    if (form.username.trim() === "") {
      formErrors.username = "Required field";
    } else if (
      form.username.trim().length > 25 ||
      form.username.trim().length < 3
    ) {
      formErrors.username = "Field has to be 3-25 characters.";
    }

    //Mail:
    if (form.mail.trim() === "") {
      formErrors.mail = "Required field";
    } else if (!regexEmail.test(form.mail.trim())) {
      formErrors.mail = "Invalid email.";
    }

    //Password:
    if (form.password.trim() === "") {
      formErrors.password = "Required field";
    } else if (
      form.password.trim().length > 25 ||
      form.password.trim().length < 6
    ) {
      formErrors.password = "Field has to be 6-25 characters.";
    }

    //RePassword:
    if (form.password.trim() !== form.repassword.trim()) {
      formErrors.repassword = "Passwords doesn't match.";
    }
    return formErrors;
  }

  /**  HANDLE CHANGE  **/
  const handleChange = (e) => {
    dispatch({ type: TYPES_REGISTER.handleChange, payload: e.target });
  };

  /**  HANDLE SUBMIT   **/
  const handleSubmit = (e) => {
    e.preventDefault();

    //Check errors:
    const checkErrors = validationForm();
    if (Object.keys(checkErrors).length !== 0) {
      return dispatch({
        type: TYPES_REGISTER.setErrorForm,
        payload: checkErrors,
      });
    }

    //Register:
    dispatch({ type: TYPES_REGISTER.setErrorForm, payload: {} });
    dispatch({ type: TYPES_REGISTER.setLoading });
    const url = `${URL_API}/auth/register`;
    const body = {
      username: form.username.trim(),
      mail: form.mail.trim(),
      password: form.password.trim(),
    };
    FetchFunction({ url, method: "POST", body }).then((res) => {
      if (res.status === 201) {
        dispatch({
          type: TYPES_REGISTER.setSuccessMsg,
          payload: `${form.username} registered successfully`,
        });
      } else if (res.status === 400) {
        if (res.msg === "MAIL_IN_USE") {
          dispatch({
            type: TYPES_REGISTER.setErrorFetch,
            payload: "Email already in use.",
          });
        } else if (res.msg === "USERNAME_IN_USE") {
          dispatch({
            type: TYPES_REGISTER.setErrorFetch,
            payload: "Username already in use.",
          });
        }
      }
    });
  };

  return {
    form,
    loading,
    errors,
    errorFetch,
    handleChange,
    handleSubmit,
    successMsg,
  };
};

export default useRegister;
