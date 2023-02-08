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

  return errorsForm;
}
