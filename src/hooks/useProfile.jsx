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
    imageForm,
    birthdayForm,
    addressesList,
    addressForm,
  } = states;

  /** ============================  USE EFFECT  ============================  **/
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

    //Image:
    if (user.user_image !== "") {
      dispatch({
        type: TYPES_PROFILEROUTE.setImageForm,
        payload: user.user_image,
      });
    }

    //Addresses:
    dispatch({
      type: TYPES_PROFILEROUTE.setAddresses,
      payload: user.user_addresses,
    });
  }, []);

  /** ============================  CHANGE HANDLERS  ============================  **/
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
  //Image:
  const HCImage = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    dispatch({ type: TYPES_PROFILEROUTE.handleChangeImage, payload: img });
  };

  // Birthday:
  const HCBirthday = (e) => {
    dispatch({
      type: TYPES_PROFILEROUTE.handleChangeBirthday,
      payload: e.target,
    });
  };

  // Address:
  const HCAddress = (e) => {
    dispatch({
      type: TYPES_PROFILEROUTE.handleChangeAddress,
      payload: e.target,
    });
  };

  /** ============================  SUBMIT HANDLERS  ============================  **/

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

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /* IMAGE: */

  const HSImage = (e) => {
    e.preventDefault();
    if (imageForm.data === "") return;
    let imgData = new FormData();
    imgData.append("image", imageForm.data);
    const url = `${URL_API}/user/image/${user.user_id}`;

    dispatch({ type: TYPES_PROFILEROUTE.setloading });
    FetchFunction({ url, method: "PUT", files: true, body: imgData }).then(
      (res) => {
        if (res.status === 201) {
          logIn(user.user_id, token);
          navigate("/profile");
        } else {
          dispatch({
            type: TYPES_PROFILEROUTE.setErrorFetch,
            payload: "Server error",
          });
        }
      }
    );
  };
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* BIRTHDAY: */
  const HSBirthday = (e) => {
    e.preventDefault();

    //Reset Errors:
    dispatch({ type: TYPES_PROFILEROUTE.resetErrorsForm });

    //Check errors:
    const checkErrors = validateForm(birthdayForm, ["day", "month", "year"]);
    if (Object.keys(checkErrors).length !== 0) {
      return dispatch({
        type: TYPES_PROFILEROUTE.setErrorsForm,
        payload: checkErrors,
      });
    }

    //Update birthday:
    dispatch({ type: TYPES_PROFILEROUTE.setloading });
    const url = `${URL_API}/user/update/birthday/${user.user_id}`;
    FetchFunction({ url, method: "PUT", body: birthdayForm }).then((res) => {
      if (res.status === 201) {
        logIn(user.user_id, token);
        navigate("/profile");
      } else {
        dispatch({
          type: TYPES_PROFILEROUTE.setErrorFetch,
          payload: "Server error",
        });
      }
    });
  };

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* ADDRESS  */
  const HSDeleteAddress = (e, id) => {
    e.preventDefault();
    dispatch({ type: TYPES_PROFILEROUTE.setloading });
    const url = `${URL_API}/user/address/del/${id}`;

    FetchFunction({ url, method: "DELETE" }).then((res) => {
      if (res.status === 200) {
        logIn(user.user_id, token);
        navigate("/profile");
      } else {
        dispatch({
          type: TYPES_PROFILEROUTE.setErrorFetch,
          payload: "Server Error",
        });
      }
    });
  };

  const HSAdress = (e) => {
    e.preventDefault();

    //Reset Errors:
    dispatch({ type: TYPES_PROFILEROUTE.resetErrorsForm });

    //Check errors:
    const checkErrors = validateForm(addressForm, [
      "street",
      "number",
      "floor",
      "apartment",
      "city",
      "state",
    ]);

    if (Object.keys(checkErrors).length !== 0) {
      return dispatch({
        type: TYPES_PROFILEROUTE.setErrorsForm,
        payload: checkErrors,
      });
    }

    //create address:
    dispatch({ type: TYPES_PROFILEROUTE.setloading });
    const url = `${URL_API}/user/address/add/${user.user_id}`;
    const body = {
      street: addressForm.street,
      number: addressForm.number.toString(),
      floor: addressForm.floor.toString(),
      apartment: addressForm.apartment,
      city: addressForm.city,
      state: addressForm.state,
    };
    FetchFunction({ url, method: "POST", body }).then((res) => {
      if (res.status === 201) {
        logIn(user.user_id, token);
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
    HCImage,
    HSImage,
    imageForm,
    birthdayForm,
    HCBirthday,
    HSBirthday,
    addressesList,
    addressForm,
    HSDeleteAddress,
    HCAddress,
    HSAdress,
  };
};

export default useProfile;
