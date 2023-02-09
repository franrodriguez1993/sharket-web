export default function validateForm(form, check) {
  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let errorsForm = {};

  /**  USERNAME  **/
  if (check.includes("username")) {
    if (!form.username.trim()) {
      errorsForm.username = "Required Field";
    } else if (
      form.username.trim().length > 25 ||
      form.username.trim().length < 3
    ) {
      errorsForm.username = "Field has to be 3-25 characters";
    }
  }

  /**  NAME  **/
  if (check.includes("name")) {
    if (form.name.trim() === "") {
      errorsForm.name = "Required Field";
    } else if (form.name.trim().length > 25 || form.name.trim().length < 3) {
      errorsForm.name = "Field has to be 3-25 characters";
    }
  }

  /**  LASTNAME  **/
  if (check.includes("lastname")) {
    if (form.lastname.trim() === "") {
      errorsForm.lastname = "Required Field";
    } else if (
      form.lastname.trim().length > 25 ||
      form.lastname.trim().length < 3
    ) {
      errorsForm.lastname = "Field has to be 3-25 characters";
    }
  }

  /**  DNI  **/
  if (check.includes("dni")) {
    if (form.dni === "") {
      errorsForm.dni = "Required Field";
    } else if (
      form.dni.toString().length > 8 ||
      form.dni.toString().length < 7
    ) {
      errorsForm.dni = "Field has to be 7-8 characters";
    }
  }

  /**  PHONE  **/
  if (check.includes("phone")) {
    if (form.phone === "") {
      errorsForm.phone = "Required Field";
    } else if (form.phone.toString().length !== 12) {
      errorsForm.phone = "Field has to be 12 characters";
    }
  }

  /**  MAIL  **/
  if (check.includes("mail")) {
    if (form.mail.trim() === "") {
      errorsForm.mail = "Required field";
    } else if (!regexEmail.test(form.mail.trim())) {
      errorsForm.mail = "Invalid email.";
    }
  }

  /**  PASSWORD  **/
  if (check.includes("password")) {
    if (form.password.trim() === "") {
      errorsForm.password = "Required field";
    } else if (
      form.password.trim().length > 25 ||
      form.password.trim().length < 6
    ) {
      errorsForm.password = "Field has to be 6-25 characters";
    }
  }

  /**  REPASSWORD  **/
  if (check.includes("repassword")) {
    if (form.repassword.trim() !== form.password) {
      errorsForm.password = "Fields doesn't match";
      errorsForm.repassword = "Fields doesn't match";
    }
  }

  /**  BIRTHDAY - DAY   **/
  if (check.includes("day")) {
    if (form.day === 0) {
      errorsForm.day = "Required field";
    } else if (form.day < 1 || form.day > 31) {
      errorsForm.day = "Invalid value has to be 1-31";
    }
  }
  /**  BIRTHDAY - MONTH   **/
  if (check.includes("month")) {
    if (form.month === 0) {
      errorsForm.month = "Required field";
    } else if (form.month < 1 || form.month > 12) {
      errorsForm.month = "Invalid value has to be 1-12";
    }
  }

  /**  BIRTHDAY - YEAR   **/
  if (check.includes("year")) {
    if (form.year === 0) {
      errorsForm.year = "Required field";
    } else if (form.year < 1940 || form.year > 2022) {
      errorsForm.year = "Invalid value has to be 1940-2022";
    }
  }

  /**  ADDRESS - STREET   **/
  if (check.includes("street")) {
    if (form.street.trim() === "") {
      errorsForm.street = "Required field";
    }
  }

  /**  ADDRESS - NUMBER   **/
  if (check.includes("number")) {
    if (form.number.toString().length > 6) {
      errorsForm.number = "Invalid number street";
    } else if (form.number.toString().trim() === "") {
      errorsForm.number = "Required field";
    }
  }

  /**  ADDRESS - FLOOR   **/
  if (check.includes("floor")) {
    if (form.floor.toString().trim() !== "") {
      if (form.floor > 100 || form.floor < 0) {
        errorsForm.floor = "Invalid floor";
      }
    }
  }

  /**  ADDRESS - APARTMENT   **/
  if (check.includes("apartment")) {
    if (form.apartment.trim() !== "") {
      if (form.apartment.length !== 1) {
        errorsForm.apartment = "Invalid Apartment";
      }
    }
  }

  /**  ADDRESS - CITY   **/
  if (check.includes("city")) {
    if (form.city.trim() === "") {
      errorsForm.city = "Required field";
    } else if (form.city.trim().length > 40 || form.city.trim().length < 3) {
      errorsForm.city = "Field has to be 3-40 characters";
    }
  }

  /**  ADDRESS - STATE   **/
  if (check.includes("state")) {
    if (form.state.trim() === "") {
      errorsForm.state = "Required field";
    } else if (form.state.trim().length > 40 || form.state.trim().length < 3) {
      errorsForm.state = "Field has to be 3-40 characters";
    }
  }

  /**  CREDIT CARD - CC_NAME   **/
  if (check.includes("cc_name")) {
    if (form.cc_name.trim() === "") {
      errorsForm.cc_name = "Required field";
    } else if (
      form.cc_name.trim().length > 40 ||
      form.cc_name.trim().length < 3
    ) {
      errorsForm.cc_name = "Field has to be 3 - 40 characters";
    }
  }

  /**  CREDIT CARD - CC_NUMBER   **/
  if (check.includes("cc_number")) {
    if (form.cc_number.toString() === "") {
      errorsForm.cc_number = "Required field";
    } else if (
      form.cc_number.toString().length < 16 ||
      form.cc_number.toString().length > 20
    ) {
      errorsForm.cc_number = "Field has to be 12-16 characters";
    }
  }

  /**  CREDIT CARD - CC_BANK   **/
  if (check.includes("cc_bank")) {
    if (form.cc_bank.trim() === "") {
      errorsForm.cc_bank = "Required field";
    } else if (
      form.cc_bank.trim().length > 40 ||
      form.cc_bank.trim().length < 3
    ) {
      errorsForm.cc_bank = "Field has to be 3 - 40 characters";
    }
  }

  /**  CREDIT CARD - CC_MONTH   **/
  if (check.includes("cc_month")) {
    if (form.cc_month === "") {
      errorsForm.cc_month = "Required field";
    } else if (form.cc_month < 1 || form.cc_month > 12) {
      errorsForm.cc_month = "Incorrect field";
    }
  }

  /**  CREDIT CARD - CC_YEAR  **/
  if (check.includes("cc_year")) {
    if (form.cc_year === "") {
      errorsForm.cc_year = "Required field";
    } else if (form.cc_year > 2040 || form.cc_year < 2023) {
      errorsForm.cc_year = "Incorrect field";
    }
  }

  /**  CREDIT CARD - CC_CODE   **/
  if (check.includes("cc_code")) {
    if (form.cc_code.toString().trim() === "") {
      errorsForm.cc_code = "Required field";
    } else if (form.cc_code.toString().length !== 3) {
      errorsForm.cc_code = "Field has to be 3 characters";
    }
  }

  return errorsForm;
}
