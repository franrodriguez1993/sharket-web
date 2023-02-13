import React from "react";

const ModalSendComment = ({
  closeModal,
  handleChange,
  form,
  handleSubmitComment,
  errorForm,
}) => {
  return (
    <div className="modal-container">
      <form className="form-container " onSubmit={handleSubmitComment}>
        <label htmlFor="body" className="form_label">
          Your answer:
        </label>
        <textarea
          name="body"
          id="body"
          className="form_textarea"
          onChange={handleChange}
          value={form.body || ""}
        ></textarea>
        {errorForm && <p className="form_input-error--p">{errorForm}</p>}
        <button className="button-blue">Send</button>
        <button className="button-warn" onClick={(e) => closeModal(e)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ModalSendComment;
