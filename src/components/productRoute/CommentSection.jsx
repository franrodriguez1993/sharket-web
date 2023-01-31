import React from "react";
import SectionLoader from "../accesories/SectionLoader";
import TYPES_PRODUCTROUTE from "../../reducers/types/productRouteTypes";
//SVG ICONS:
import backArrow from "../../svg/back_arrow.svg";
import nextArrow from "../../svg/next_arrow.svg";
import backArrowDisabled from "../../svg/back_arrow_disabled.svg";
import nextArrowDisabled from "../../svg/next_arrow_disabled.svg";

const CommentSection = ({
  comments,
  loadingComments,
  commentTotalPage,
  commentCurrentPage,
  dispatch,
}) => {
  return (
    <div className="commentData-container">
      <h3 className="commentData-title">Questions to seller</h3>
      {loadingComments ? (
        <>
          <SectionLoader />
        </>
      ) : (
        <>
          <section className="product-questions">
            {comments.map((c) => (
              <div key={c.comment_id} className="comment-card">
                <p className="comment-card-user">
                  <i>Question: </i> {c.comment_body}
                </p>
                {c.comments && c.comments.length !== 0 && (
                  <p className="comment-card-answer">
                    <i>Seller: </i>
                    {c.comments[0].comment_body}
                  </p>
                )}
              </div>
            ))}
          </section>

          {/**  -------  PAGINATION SECTION  -------  **/}
          <section>
            {/** BACK BUTTON **/}
            {commentCurrentPage > 1 ? (
              <img
                src={backArrow}
                alt="back"
                className="commentPage-buttons"
                onClick={() =>
                  dispatch({ type: TYPES_PRODUCTROUTE.backPageComment })
                }
              />
            ) : (
              <img
                src={backArrowDisabled}
                alt="back"
                className="commentPage-buttons-disabled"
              />
            )}
            {/** NEXT BUTTON **/}
            {commentCurrentPage < commentTotalPage ? (
              <img
                src={nextArrow}
                alt="back"
                className="commentPage-buttons"
                onClick={() =>
                  dispatch({ type: TYPES_PRODUCTROUTE.nextPageComment })
                }
              />
            ) : (
              <img
                src={nextArrowDisabled}
                alt="back"
                className="commentPage-buttons-disabled"
              />
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default CommentSection;
