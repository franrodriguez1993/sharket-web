import React from "react";

const CommentForm = ({
  HCFormComment,
  HSFormComment,
  formComment,
  formError,
}) => {
  return (
    <form className="form-container" onSubmit={HSFormComment}>
      <label htmlFor="body" className="form_label">
        Leave a question for the seller:
      </label>
      <textarea
        type="text"
        name="body"
        id="body"
        onChange={HCFormComment}
        className="form-comment_textarea"
        value={formComment.body || ""}
      />
      {formError && <i className="text-danger fw-bolder">{formError}</i>}
      <button className="button-blue">Send</button>
    </form>
  );
};

export default React.memo(CommentForm);
